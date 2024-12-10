import { Checkbox, FormControlLabel } from "@mui/material";

export const CustomCheckboxGroup = (
    checkedList: string[],
    setFieldValue: (field: string, value: any) => void,
    name: string,
    lists: string[]
) => {
    return lists.map((skill) => (
        <FormControlLabel
            key={skill}
            control={
                <Checkbox
                    name={name}
                    value={skill}
                    checked={checkedList.includes(skill)}
                    onChange={() =>
                        setFieldValue(
                            name,
                            checkedList.includes(skill)
                                ? checkedList.filter((s) => s !== skill)
                                : [...checkedList, skill]
                        )
                    }
                />
            }
            label={skill}
        />
    ));
};