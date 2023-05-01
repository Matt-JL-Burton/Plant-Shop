document.addEventListener("DOMContentLoaded",async () => {
    //Fetch the publishable key
    const {publishableKey} = await fetch("/config").then(r => r.json());
    const stripe = Stripe(publishableKey);

    const params = new URLSearchParams(window.location.href);
    const clientSecret = params.get("payment_intent_client_secret");

    // Display the payment intent
    const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret) 
    // document.getElementById("payment-intent").innerText = JSON.stringify(paymentIntent, null, 2)
})