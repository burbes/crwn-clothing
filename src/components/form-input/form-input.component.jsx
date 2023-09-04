
import {
    FormInputLabel,
    Input,
    GroupContainer
} from './form-input.styles.jsx'

const FormInput = ({ label, inputOptions }) => {
    return (
        <GroupContainer>
            <Input {...inputOptions} />
            {
                label && (
                    <FormInputLabel shrink={inputOptions.value.length}
                    >{label}
                    </FormInputLabel>
                )
            }
        </GroupContainer>
    );
}

export default FormInput;