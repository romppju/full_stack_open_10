import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, error, ...props }) => {
  let styleToUse = style.validTextInput;
  if (error) {
    styleToUse = style.invalidTextInput;
  }

  return <NativeTextInput style={styleToUse} {...props} />;
};

export default TextInput;
