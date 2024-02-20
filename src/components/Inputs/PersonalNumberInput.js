import MaskInput from "react-native-mask-input";
import moment from "moment";

export default function PersonalNumberInput({
  style, value, onChangeText, placeholder = "Personal number", inputMode = "numeric", editable = true, 
  mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
}) {

  const onChange = (e) => {
    let now = new Date();
    let fullYear = now.getFullYear().toString();
    let month = (now.getMonth() + 1).toString();
    let date = now.getDate().toString();
    console.log('===', e);
    if (e.length > 0 && (e.charAt(0) < 1 || e.charAt(0) > fullYear.charAt(0))) {
      return;
    }
    if (e.length > 1 && e.charAt(0) === fullYear.charAt(0) && e.charAt(1) > fullYear.charAt(1)) {
      return;
    }
    if (e.length > 2 && e.charAt(0) === fullYear.charAt(0) && e.charAt(1) === fullYear.charAt(1) && e.charAt(2) > fullYear.charAt(2)) {
      return;
    }
    if (e.length > 3 && e.charAt(0) === fullYear.charAt(0) && e.charAt(1) === fullYear.charAt(1) && e.charAt(2) === fullYear.charAt(2) && e.charAt(3) > fullYear.charAt(3)) {
      return;
    }
    //
    if (e.length > 5 && e.charAt(5) > 1) {
      return;
    } 
    if (e.length > 6 && ((e.charAt(5) === "1" && e.charAt(6) > 2) || (e.charAt(5) === "0" && e.charAt(6) === "0"))) {
      return;
    } 
    //
    if (e.length > 8 && e.charAt(8) > 3) {
      return;
    }
    if (e.length > 9 && ((e.charAt(8) === "3" && e.charAt(9) > 1) || (e.charAt(8) === "0" && e.charAt(9) === "0"))) {
      return;
    } 
    //  
    if (Number(month) < 10) {
      if (e.length > 5 && e.charAt(0) === fullYear.charAt(0) && e.charAt(1) === fullYear.charAt(1) && e.charAt(2) === fullYear.charAt(2) && e.charAt(3) === fullYear.charAt(3) && e.charAt(5) > 0) {
        return;
      }
      if (e.length > 6 && e.charAt(0) === fullYear.charAt(0) && e.charAt(1) === fullYear.charAt(1) && e.charAt(2) === fullYear.charAt(2) && e.charAt(3) === fullYear.charAt(3) && e.charAt(5) === "0" && e.charAt(6) > month) {
        return;
      }
    } else {
      if (e.length > 5 && e.charAt(0) === fullYear.charAt(0) && e.charAt(1) === fullYear.charAt(1) && e.charAt(2) === fullYear.charAt(2) && e.charAt(3) === fullYear.charAt(3) && e.charAt(5) > month.charAt(0)) {
        return;
      }
      if (e.length > 6 && e.charAt(0) === fullYear.charAt(0) && e.charAt(1) === fullYear.charAt(1) && e.charAt(2) === fullYear.charAt(2) && e.charAt(3) === fullYear.charAt(3) && e.charAt(5) === month.charAt(0) && e.charAt(6) > month.charAt(1)) {
        return;
      }
    }
    onChangeText(e);
  }

  return (
    <MaskInput 
      editable={editable}
      style={style} 
      value={value} 
      onChangeText={(e) => onChange(e)} 
      placeholder={placeholder} 
      inputMode={inputMode} 
      mask={mask} 
    />
  )
}
