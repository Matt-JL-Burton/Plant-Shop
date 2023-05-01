// When the page is fully loaded we do this
document.addEventListener('DOMContentLoaded',async () =>  {
    //fetch the publishable key from the server (This allows us to use stripe elements)
    const {publishableKey} = await fetch("/config").then(r => r.json())
    const stripe = Stripe(publishableKey)

    // Fetch the client-secret property for the payment intent
    const {clientSecret} = await fetch("/create-payment-intent", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        // body is used here to pass arguments from the client i.e product ID to get their price
    }).then(r => r.json())

    const appearance = {
        theme: 'none',
        variables: {
            borderRadius : "0px",
            fontSizeBase: "18px",
            fontFamily : 'Roboto, sans-serif',
            colorPrimary : '#000000',
            colorText : '#000000',
            fontWeightNormal : '500',
        },
        rules:{
            '.Input':{
                border: '2px solid #b4c7b2',
            },
            '.Input:hover':{
                border: '2px solid #99af97',
            },
            '.Input:focus':{
                border: '2px solid #6a8767',
                transition: 'none',
                boxShadow: 'none',
                outline:'none',
            }
        }
    };

    // mount elements
    const elements = stripe.elements({clientSecret, appearance});
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
    // Should add a line here to only display the pay button once the rest has loaded or make loading in look better

    currentURLList = window.location.href.split('/')    
    currentURLList[currentURLList.length-1] = 'complete.html'
    returnURL = currentURLList.join('/')

    //When the form is submitted
    const form = document.getElementById('payment-form');
    form.addEventListener('submit',async(e) => {
        e.preventDefault();

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams : {
                return_url: returnURL
            }
        })
        if (error) {
            const messages = document.getElementById('error-messages')
            messages.innerText = error.message;
        }
    })
})  