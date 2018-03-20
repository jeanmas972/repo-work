import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value } 
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err => 
                    this.setState({ errors: err.response.data.errors, loading: false })
                );
        }
    }

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";
        return errors;
    }

    render(){
        const { data, errors, loading } = this.state;
        return(
            <Form onSubmit={this.onSubmit} loading={loading}>
                { errors.global && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                )}
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="example@example.com" 
                        value={data.email}
                        onChange={this.onChange}
                    />
                    { errors.email && <InlineError text={errors.email} /> }
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="email">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Make it secure" 
                        value={data.pasword}
                        onChange={this.onChange}
                    />
                    { errors.password && <InlineError text={errors.password} /> }
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        )
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}



export default LoginForm;

/*
[e.target.name]: e.target.value : permet d'insérer dans data les valeurs du imput en se servant de son nom

la valeur de data.email = valeur dans <input name="email" />
*/

// dans la fonction validate on peut ajouter autant de conditions d'erreurs que l'on veut

/*
error={!!errors.email} : met le champ email en rouge 
imported from semantic ui
*/

/*
{ errors.email && <InlineError text={errors.email} /> } : fonctionne comme un if sous cette forme

si errors.email alors affiche l'erreur email (sous le champ en rouge)

*/

/*
LoginForm.propTypes : s'assure que la fonction submit (ligne 25) soit obligatoire vérifiée


*/