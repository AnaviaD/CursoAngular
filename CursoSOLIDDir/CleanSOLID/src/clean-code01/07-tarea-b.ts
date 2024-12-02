(()=>{

    //* Aplicar el principio de responsabilidad única
    //* Priorizar la composición frente a la herencia

    type HtmlType = 'input'|'select'|'textarea'|'radio';
   
    interface HtmlElementProps {
        id      : string;
        type    : HtmlType;
    }

    class HtmlElement {
        public id: string;
        public type: HtmlType;
        constructor({ id, type }: HtmlElementProps) 
        {
            this.id = id;
            this.type = type;
        }
    }

    interface InputAttributesProps{
        value           : string;
        placeholder     : string;
    }

    class InputAttributes {
        
        public value: string;
        public placeholder: string;
        
        constructor({ value, placeholder } : InputAttributesProps) {
            this.value = value;
            this.placeholder = placeholder;
        }
    }

    interface InputElementProps{
        value           : string;
        placeholder     : string;
        id              : string;
    }

    class InputElement{
        public htmlElement: HtmlElement;
        public inputAttributes : InputAttributes;

        constructor({ value, placeholder, id }: InputElementProps){
            this.htmlElement = new HtmlElement({id, type : 'input'});
            this.inputAttributes = new InputAttributes({value, placeholder});
        }

        setFocus() {};
        getValue() {};
        isActive() {};
        removeValue() {};
    }

    
    //? Idea para la nueva clase InputElement
    
    const nameField = new InputElement({ value: 'Fernando', placeholder: 'Enter first name', id: 'txtName'});
    
    console.log({ nameField });
    
})()



// class InputEvents extends InputAttributes {
//     constructor( value: string, placeholder: string, id: string ) {
//         super( value, placeholder, id );
//     }

//     setFocus() {};
//     getValue() {};
//     isActive() {};
//     removeValue() {};
// }