import React from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import moment from 'moment';

export const convertToHtmlDate = (inputDate) => {
    return inputDate ? moment(inputDate, "YYYY-MM-DDThh:mm:ssZ").format("YYYY-MM-DD") : "";
};

export const convertToUserDate = (inputDate) => {
    return inputDate ? moment(inputDate, "YYYY-MM-DD").format("YYYY-MM-DDThh:mm:ssZ") : "";
};


export const dropdownWithBlankOption = (options = [], blankValueLabel = "") => {
    const menuOptions = [{ code: "", name: blankValueLabel }, ...options];
    return dropDownItems(menuOptions);
}

export const dropDownItems = (options = []) => {
    const dropDownList = options.map(function (option) {
        return (
            <MenuItem key={option.code} value={option.code} >
                {`${option.name}`}
            </MenuItem>
        );
    });
    return dropDownList;
};
