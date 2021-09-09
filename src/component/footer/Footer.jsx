import './footer.css';
import { CopyrightOutlined } from '@material-ui/icons';

export default function Footer() {

    const currentYear= new Date().getFullYear()

    return (
        <div className="footerContainer">
            <span className="footertext">Copy Right Reserved {currentYear} <CopyrightOutlined /></span>
        </div>
    )
}
