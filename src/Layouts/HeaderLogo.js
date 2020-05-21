import React from 'react';
import{Link} from 'react-router-dom';
class HeaderLogo extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="logo pull-left">
                    <Link to="index.html"><img src="images/home/logo.png" alt="" /></Link>
                </div>
                <div className="btn-group pull-right clearfix">
                    <div className="btn-group">
                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                            USA
									<span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to="">Canada</Link></li>
                            <li><Link to="">UK</Link></li>
                        </ul>
                    </div>

                    <div className="btn-group">
                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                            DOLLAR
									<span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to="">Canadian Dollar</Link></li>
                            <li><Link to="">Pound</Link></li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default HeaderLogo