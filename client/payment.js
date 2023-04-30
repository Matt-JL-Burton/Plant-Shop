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

    // mount elements
    const elements = stripe.elements({clientSecret});
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