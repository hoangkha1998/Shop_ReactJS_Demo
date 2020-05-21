import React from 'react';
class FormError extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let errorForm = this.props.formError;
        return (
            <div>
                {Object.keys(errorForm).map(function (value, index) {
                    if (errorForm[value].length > 0) {
                        return (
                            <p key={index}>{value  }:{errorForm[value]}</p>
                        )
                    } else {
                        return ''
                    }

                })}
            </div>
        )
    }

}
export default FormError