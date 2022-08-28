
import { useState } from "react";
import { Field, Form as FieldForm } from "react-final-form";
import { useNavigate } from "react-router-dom";

import {
  Button,
  ControlLabel,
  Form as RsuiteForm,
  FormGroup,
  Message,
} from "rsuite";
import TextCustomField from "../../components/FinalFormComponent/TextCustomField";

const required = (value) => (value ? undefined : "Required");

function Login(props) {
  const [isError, setIsError] = useState("");
  const navigate = useNavigate()
  const {getUser} = props
  console.log(props)

  const onSubmit = async (values) => {
    const { username, password } = values;

    const data = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => res.json());
   localStorage.setItem("token", data.token);
 localStorage.setItem("firstName", data.firstName);
 localStorage.setItem("lastName", data.lastName);

    const token = localStorage.getItem("token");
    getUser(token)
    if (token === "undefined") {
      setIsError("Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại");
    } else {
      setIsError(""); 
      navigate('/')
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <FieldForm
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit, submitting, pristine }) => (
            <>
              <RsuiteForm
                layout="inline"
                className="login-form-input"
                onSubmit={handleSubmit}
      
              >
                <div>
                  <FormGroup style={{ display: "flex" }}>
                    <div>
                      <ControlLabel className="input-lable-select">
                        Tên đăng nhập
                      </ControlLabel>
                      <Field
                        className="input-content"
                        name="username"
                        component={TextCustomField}
                        placeholder=" "
                        validate={required}
                      />
                     
                    </div>
                  </FormGroup>

                  <FormGroup style={{ display: "flex" }}>
                    <div>
                      <ControlLabel className="input-lable-select">
                        Mật khẩu
                      </ControlLabel>
                      <Field
                        className="input-content"
                        name="password"
                        type="password"
                        component={TextCustomField}
                        placeholder=" "
                        validate={required}
                      />
                   
                    </div>
                  </FormGroup>
                  <FormGroup className="input-error">
                    {isError !== "" ? (
                      <Message showIcon type="error" description={isError} />
                    ) : (
                      ""
                    )}
                  </FormGroup>
                  <Button
                    type="submit"
                    disabled={submitting || pristine}
                    className= 'blue text-ite'
                    loading={submitting}
                    appearance="primary"
                   
                  >
                    Đăng nhập
                  </Button>
                </div>
              </RsuiteForm>
            </>
          )}
        />
      </div>
    </div>
  );
}

export default Login;
