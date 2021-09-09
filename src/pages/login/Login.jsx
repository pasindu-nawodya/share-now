import FacebookLogin from 'react-facebook-login';
import { useHistory } from "react-router-dom";
import { Facebook, Share, CheckCircleOutline } from '@material-ui/icons';
import './login.css';

export default function Login() {

    const history = useHistory();

    const responseFacebook = (response) => {

        console.log(response);
        if(response.status !== "unknown"){            
            history.push({
            pathname: '/home',
            state: { details: response },
          });
        }
      }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Share Now</h3>
                    <img src="assest/login.png" alt="" className="loginImg" />
                    <span className="loginDesc"> Share Instantly with <span style={{color:"#0b9c4c"}}>“Share Now”</span> < Share color="#0b9c4c"/></span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <div className="serviceList">
                            <div className="serviceListItem">
                                <span style={{color:"#0b9c4c"}}><CheckCircleOutline /></span>
                                <span className="serviceText">Instantly Login with facebook</span>
                            </div>
                            <div className="serviceListItem">
                                <span style={{color:"#0b9c4c"}}><CheckCircleOutline /></span>
                                <span className="serviceText">Share Your Ideas On your Pages Quickly</span>
                            </div>
                            <div className="serviceListItem">
                                <span style={{color:"#0b9c4c"}}><CheckCircleOutline /></span>
                                <span className="serviceText">Generate Random Quote and publish to your Page</span>
                            </div>
                            <div className="serviceListItem">
                                <span style={{color:"#0b9c4c"}}><CheckCircleOutline /></span>
                                <span className="serviceText">Publish Daily Inspiration Quote</span>
                            </div>
                        </div>
                        <div className="loginBtnContainer">
                            <FacebookLogin
                                appId="906855699914929"
                                autoLoad={false}
                                fields="name,email,picture,hometown"
                                callback={responseFacebook}
                                cssClass="loginButton"
                                icon = {<Facebook />}
                            />
                        </div>                    
                    </div>
                </div>
            </div>            
        </div>
    )
}
