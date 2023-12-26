class BoxShadowGenerator{

    constructor(
        horizontal,
        horizontalRef,
        vertical,
        verticalRef,
        blur,
        blurRef,
        spread,
        spreadRef,
        color,
        colorRef,
        opacity,
        opacityRef,
        inset,
        previewBox,
        rule,
        webkitRule,
        mozRule
    ){

        // propriedades/atributos da classe
        this.horizontal = horizontal
        this.horizontalRef = horizontalRef
        this.vertical = vertical
        this.verticalRef = verticalRef
        this.blur = blur
        this.blurRef = blurRef
        this.spread = spread
        this.spreadRef = spreadRef
        this.color = color
        this.colorRef = colorRef
        this.opacity = opacity
        this.opacityRef = opacityRef
        this.inset = inset
        this.previewBox = previewBox
        this.rule = rule
        this.webkitRule = webkitRule
        this.mozRule = mozRule;

    }

    initialize(){
        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.blurRef.value = this.blur.value;
        this.spreadRef.value = this.spread.value;
        this.colorRef.value = this.color.value;
        this.opacityRef.value = this.opacity.value;
      
       
        // demostração no box e exibir definição de regras
        this.applyRule()
        this.showRule()
    }

    applyRule(){
        const rgbValue = this.hexToRgb(this.colorRef.value)
     
        const showRule = `${this.inserRef ? "inset" : ""} ${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px rgba(${rgbValue}, ${this.opacityRef.value})`
        this.previewBox.style.boxShadow = showRule 
        this.currentRule = showRule;
    }

    showRule(){
        this.rule.innerText = this.currentRule
        this.webkitRule.innerText = this.currentRule
        this.mozRule.innerText = this.currentRule
    }

    updateValue(type, value){
        switch(type){
            case "horizontal":
                this.horizontalRef.value = value
            break
            case "vertical":
                this.verticalRef.value = value
            break
            case "blur":
                this.blurRef.value = value
            break
            case "spread":
                this.spreadRef.value = value
            break
            case "color":
                this.colorRef.value = value
            break
            case "opacity":
                this.opacityRef.value = value
            break
            case "inset":
                this.inserRef = value
            break
        }

        //  // demostração no box e exibir definição de regras (incluindo modificações de atributos)
        this.applyRule()
        this.showRule()
    }


    hexToRgb(hex){
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
            ("0x" + hex[5] + hex[6]) | 0
          }`;
    }
}

// Seleção de elementos
const horizontal = document.querySelector("#horizontal")
const horizontalRef = document.querySelector("#horizontal-value")

const vertical = document.querySelector("#vertical")
const verticalRef = document.querySelector("#vertical-value")

const blur = document.querySelector("#blur")
const blurRef = document.querySelector("#blur-value")

const spread = document.querySelector("#spread")
const spreadRef = document.querySelector("#spread-value")

const color = document.querySelector("#color")
const colorRef = document.querySelector("#color-value")

const opacity = document.querySelector("#opacity")
const opacityRef = document.querySelector("#opacity-value")

const inset = document.querySelector("#inset")

const previewBox = document.querySelector("#box") //caixa preview

// regras de copy
const rule = document.querySelector("#rule span")
const webkitRule = document.querySelector("#webkit-rule span")
const mozRule = document.querySelector("#moz-rule span")


// classe criada
const boxShadow = new BoxShadowGenerator( horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    inset,
    previewBox,
    rule,
    webkitRule,
    mozRule)


boxShadow.initialize()




// Eventos


const config = [horizontal, vertical, blur, spread, color, opacity, inset]

config.forEach((element) =>{
   element.addEventListener("input", (e)=>{
    const str = element.id
    let value = ""
    if(str === "inset"){
         value = e.target.checked
    }else{
         value = e.target.value
    }
   
    

    boxShadow.updateValue(str, value)
   })

})

// Copiar regra

const rulesArea = document.querySelector("#rules-area")
const copyInstructions = document.querySelector("#copy-instructions")

rulesArea.addEventListener("click", () =>{
    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "")
    
    navigator.clipboard.writeText(rules).then(() =>{
        copyInstructions.innerText = "Regra copiada com sucesso!"

        setTimeout(() =>{
            copyInstructions.innerText = "Clique no quadro acima para copiar as regras"
        }, 1000)
    })
})