function getDocHeight() 
{
    var body = document.body;
    var docu_element = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight, 
        docu_element.clientHeight, docu_element.scrollHeight, docu_element.offsetHeight);
}

function openMenu()
{
    document.getElementById("body").style.overflow = "hidden";
    document.getElementById("menu").style.display = "flex";
}

function closeMenu()
{
    document.getElementById("body").style.overflow = "auto";
    document.getElementById("menu").style.display = "none";
}

function BackToTop()
{
    var headerHeight = document.querySelector("header").clientHeight;
    var currentHeight = window.pageYOffset;

    if (currentHeight > headerHeight)
    {
        document.getElementsByClassName("back-to-top").display = "flex";
    }
    else
    {
        document.getElementsByClassName("back-to-top").display = "none";
    }

}

function showPlant()
{
    console.log("plant")
}