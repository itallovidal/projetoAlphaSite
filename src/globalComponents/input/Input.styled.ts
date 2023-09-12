import styled from "styled-components";

interface IFieldWrapper{
    $proportion: number
}

export const FieldWrapper = styled.div<IFieldWrapper>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: ${({$proportion})=> $proportion };
  
  input{
    padding: 1rem 2rem;
    outline: none;
    border-radius: 8px;
    border: none;
    background-color: ${({theme})=>theme.COLORS.SECONDARY};
    //letter-spacing: 1.2;
    
    &::placeholder{
      opacity: .4;
    }
  }
  
  span{
    margin-bottom: 1rem;
    color: red;
    height: 0;
    overflow: hidden;
    transition: 300ms;
  }
  
  span.errorActive{
    height: calc(1ch + 1rem);
    
  }
`