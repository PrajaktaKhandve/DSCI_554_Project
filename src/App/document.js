module.exports = `<!DOCTYPE html>
<html lang = "en">
    <head>
        <meta charset = "UTF-8">
        <meta name = "viewport" content = "device-width, initial-scale=1.0">
        <title>Document</title> 
        <link rel = "stylesheet" href = "style.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;1,300&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>

    <body>
        <div class ="big-container">
            <div class = "container">
                <header>
                    <div class = "logo">
                        <h1> </h1>
                    </div>
                    <nav>
                        <ul>
                            <li> <a href = "/" >HOME</a></li>
                            <li> <a href = "/region" >Region</a></li>
                            <li> <a href = "/map" >Map</a></li>
                            <li> <a href = "/airports" >Airports</a></li>
                            <li> <a href = "#" class = "active">GET STARTED</a></li>
                        </ul>
                        <form>
                            <input type ="text" name ="srch" id ="srch"
                            required placeholder = "Enter your search">
                            <button type="submit"><i class = "fa fa-search"></i></button>
                        </form>

                    </nav>
                </header>
                <section>
                    <h2>EFFECT OF COVID-19 ON AIR TRAVEL</h2>
                    <a href = "#" class = "active">Get started</a>
                </section>
                <footer>
                    <h2>About us</h2>
                    <p>write some text</p>
                    <h3>
                        Follow us on social media
                    </h3>
                    <div class="row">
                        <a href = "#"><i class = "fa fa-facebook"></i></a>
                        <a href = "#"><i class = "fa fa-twitter"></i></a>
                        <a href = "#"><i class = "fa fa-instagram"></i></a>
                        <a href = "#"><i class = "fa fa-linkedin"></i></a>
                    </div>
                </footer>
                <video src = "../data/videoplayback.mkv" autoplay muted loop></video>
            </div>
        </div>
    </body>
</html>`;
