import React from 'react';
import NumberFormat from 'react-number-format';

class CurrencyNumberFormat extends React.PureComponent {
    render() {
        var newProps = {...this.props};
        delete newProps.onChange;
        return (
            <NumberFormat thousandSeparator prefix="$ "
              {...newProps}
                onValueChange={values => {
                    this.props.onChange({ target: { value: values.value, } });
                }}
            />
        );
    }
}

export default (CurrencyNumberFormat);
