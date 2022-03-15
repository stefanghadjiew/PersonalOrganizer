import { useState } from "react";
import { validateInput } from "../utils";

export const useInput = (initialValue) => {
    const [inputValue,setInputValue] = useState(initialValue)
    const [error,setError] = useState(false)

    const handleChange = (e) => {
        setInputValue(e.currentTarget.value)
        setError(validateInput(e.currentTarget.type,e.currentTarget.value))
    }

    return {
        value:inputValue,
        setValue:setInputValue,
        error,
        onChange:handleChange
    }
}
