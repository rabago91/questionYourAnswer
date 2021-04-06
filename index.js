var fondo = document.getElementById('canvasLienzo');

var amplitude = 40;
var frequency = 2;
var phaseOffset = 10;
var speed = 1.5;
var padding = 50;
var beizerGradientRamp = gradientB;

var font1 = "CourierPrime";
var font2 = "RobotoCondensed"

var randomQuoteNumber = 1;
var quoteKind=Quotes;

var freeQuotesQuantity = 3;
var premiumQuotesQuantity = 3 + 13;

var free = Quotes;
var premium = PremiumQuotes;

var userRol = freeQuotesQuantity;

var quoteKindString;

var freePremiumTry = 0;

window.onload = function() {
        var app = new PIXI.Application(
            {
                view: document.getElementById('canvasLienzo'),
                width: 600,
                height: 500,
                backgroundColor: 0x000000
            }
        );
        
        app.loader.baseUrl = "src";
        app.loader
            .add("startImage", "images/QuestionEverything.jpeg")
            .add("Shaded", "images/QuestionEverythingBlack.png")
        app.loader.onComplete.add(doneLoading);
        app.loader.load();

        function doneLoading(){
            var UIskinSprite = new PIXI.Sprite.fromImage('src/images/QuestionEverything.jpeg');

        ////////////////////////////////////////////////////////
        ////////////////Interaction Buttons  ///////////////////
        ////////////////////////////////////////////////////////

        document.getElementById("formId").addEventListener("submit", getAnswer);
        function getAnswer() {
            var empt = document.forms["form1"]["yourProblem"].value;
                if (empt == "") {
                    console.log("Empty");
                    text1.text = "\n\nEscribe tu\nproblema para\nencontrar\ntu respuesta...";
                    text1.style.fill = '#ff0000';
                    text2.text = "";
                    UIskinSprite.texture = app.loader.resources["Shaded"].texture;

                } else {
                    document.getElementById("formId").reset();
                    RandomQuote ()
                    console.log("This is a " + quoteKindString)
                    console.log("Quote number: " + randomQuoteNumber)
                    console.log(quoteKind[quoteNumber][0] + " : " + quoteKind[quoteNumber][1])
                    text1.text = quoteKind[quoteNumber][0];
                    text2.text = quoteKind[quoteNumber][1];
                    text1.style.fill = '#FFDE19';
                    UIskinSprite.texture = app.loader.resources["Shaded"].texture;
                    if (freePremiumTry>1) {
                        freePremiumTry = freePremiumTry - 1;
                        document.getElementById("premiumTry").innerHTML = freePremiumTry + " Tries";
                    } else {
                        userRol = freeQuotesQuantity;
                        document.body.style.background = "url('src/images/texturePaper.jpeg') repeat";
                        document.getElementsByClassName("changeText")[0].style.color = "black";
                        document.getElementsByClassName("changeText")[1].style.color = "black";
                        document.getElementById("premiumTry").classList.add("hide");
                        speed = 1.5
                        AssetContainer.filters = false;
                    }

                }
            document.forms["form1"]["yourProblem"].blur();
            return false
        }

        document.getElementById("gimmeAnswer").addEventListener("click", function() {
            getAnswer()
        });

        document.getElementById("premiumButton").addEventListener("click", function() {
            userRol = premiumQuotesQuantity;
            document.body.style.background = "rgba(0,0,0,.6) url('src/images/texture.jpg') repeat";
            document.getElementsByClassName("changeText")[0].style.color = "white";
            document.getElementsByClassName("changeText")[1].style.color = "white";
            document.getElementById("premiumButton").classList.add("hide");
            document.getElementById("premiumTry").classList.remove("hide");
            freePremiumTry = 5;
            document.getElementById("premiumTry").innerHTML = freePremiumTry + " Free Tries";
            speed = 3.5
            console.log("Premium try");
            AssetContainer.filters = [filterRGBsplit];
        });

        function RandomQuote () {
            while (randomQuoteNumber == lastRandomQuoteNumber) {
                randomQuoteNumber = Math.floor((Math.random() * userRol) + 1);
                // console.log("Random number: "+ randomQuoteNumber + " / Last number: " + lastRandomQuoteNumber)
            }

            lastRandomQuoteNumber = randomQuoteNumber;

            if (randomQuoteNumber >= 4) {
                quoteKind = PremiumQuotes;
                quoteKindString = "Premium Quote"
                quoteNumber = randomQuoteNumber-4;
            } else {
                quoteKind = Quotes;
                quoteKindString = "Free Quote"
                quoteNumber = randomQuoteNumber-1;
            };
        }
        ////////////////////////////////////////////////////////

        document.body.appendChild(app.view);
        var lastRandomQuoteNumber = 1;
        var quoteNumber = 0;
        var quoteText = quoteKind[quoteNumber][0];
        var authorText = quoteKind[quoteNumber][1];

        text1 = new PIXI.Text("");
        text1.x = app.view.width / 2;
        text1.y = app.view.height / 2;
        text1.anchor.set(0.5);
        text1.style = new PIXI.TextStyle({
            fill: 0xFFDE19,
            fontSize: 30,
            fontFamily: font1,
        });

        text2 = new PIXI.Text("");
        text2.x = app.view.width / 2;
        text2.y = app.view.height / 2;
        text2.anchor.set(0);
        text2.style = new PIXI.TextStyle({
            fill: 0xFFFFFF,
            fontSize: 15,
            fontFamily: font2,
        });

        var assigner1 = text1;
        var assigner2 = text2;

        var GradientContainer = new PIXI.Container();
        var BGassetContainer = new PIXI.Container();
        var AssetContainer = new PIXI.Container();
        var AssetContainerWrapper = new PIXI.Container();

        var assetA = assigner1;
        var assetB = assigner2;

        var BGasset = UIskinSprite;

        // Reposition BGasset
        BGasset.x = (app.view.width / 2)-230;
        BGasset.y = (app.view.height / 2)-200;

        // Reposition AssetA
        assetA.x = (app.view.width / 2);
        assetA.y = (app.view.height / 2)-100;

        // Reposition AssetB
        assetB.x = (app.view.width / 2);
        assetB.y = (app.view.height / 2)+70;

        ///////////////////////////////////////////////////////////
        //              Create Gradient Ramp sprite 
        ///////////////////////////////////////////////////////////
        var canvasGradient = document.createElement('canvas');
        canvasGradient.width  = 512;
        canvasGradient.height = 512;
        var ctx = canvasGradient.getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, canvasGradient.width, 0);
        for (let index = 0; index < frequency; index++) {
            const E = index+1
            // console.log(E)
            for (let i = 0; i < beizerGradientRamp.length; i++) {
                const e = beizerGradientRamp[i];
                cycleRampOne = (beizerGradientRamp[i][0]/frequency)+((1/frequency)*index);
                cycleRampTwo = (beizerGradientRamp[i][0]/frequency)+((1/frequency)*index)+(1/(frequency*2));
                reverseNumbers = beizerGradientRamp.length-i-1;
                hexReverse = beizerGradientRamp[reverseNumbers][1]

                if (i == 0) {
                }
                gradient.addColorStop(cycleRampOne, e[1]);
                gradient.addColorStop(cycleRampTwo, hexReverse);

            }
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasGradient.width, canvasGradient.height);
        var gradientRamp = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvasGradient));
        gradientRamp.x = 0;
        gradientRamp.y = 0;

        ///////////////////////////////////////////////////////////            
        var displacementSprite = gradientRamp;

        var filterRGBsplit = new PIXI.filters.RGBSplitFilter();


        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
        displacementFilter.padding = padding;
        
        displacementSprite.position = assetA.position;
        
        displacementFilter.scale.x = 1; //30
        displacementFilter.scale.y = amplitude; //60
        displacementSprite.x = displacementSprite.x + (phaseOffset*10);
        
        AssetContainerWrapper.filters = [displacementFilter];
        // AssetContainer.filters = [filterRGBsplit];
        AssetContainer.filters = false;
        BGassetContainer.filters = [displacementFilter];


        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        app.stage.addChild(displacementSprite);
        app.stage.addChild(GradientContainer);
        app.stage.addChild(BGassetContainer);
        app.stage.addChild(AssetContainerWrapper);
        GradientContainer.addChild(gradientRamp);
        BGassetContainer.addChild(BGasset);
        AssetContainerWrapper.addChild(AssetContainer);
        AssetContainer.addChild(assetA);
        AssetContainer.addChild(assetB);
        ///////////////////////////////////////////////////////////

        function randomNum(){
            Math.floor((Math.random() * 10))
        };

        ///////////////////////////////////////////////////////////
                                // Ticker
        ///////////////////////////////////////////////////////////
        let delta = 0;

        app.ticker.add(animate);
        function animate() {
            // Offset the sprite position to make vFilterCoord update to larger value. Repeat wrapping makes sure there's still pixels on the coordinates.
            displacementSprite.x+=speed;
            // Reset x to 0 when it's over width to keep values from going to very huge numbers.
            if (displacementSprite.x > displacementSprite.width) displacementSprite.x = 0;

            delta += 0.02;
            var sinDelta = Math.sin(delta) * 10;
            function sinDeltaExpose() {
            var out;
                if (sinDelta>=8 || sinDelta<=-8) {
                    out = sinDelta *= 50
                } else {
                    out = sinDelta
                }
                return out
            }
            var randomValue = Math.floor((Math.random() * sinDelta));

            
            filterRGBsplit.red = [-randomValue,0];
            filterRGBsplit.green = [randomValue,0];
            filterRGBsplit.blue = [0,randomValue*2];
            // console.log(sinDeltaExpose())
        }



    }
}