import React from 'react';
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { Refresh, ExitToApp } from '@material-ui/icons';
import ReactTooltip from "react-tooltip";
import Footer from '../../component/footer/Footer';
import Topbar from '../../component/topbar/Topbar';
import './home.css';


export default function Home() {

    const [acctoken, setAcctoken] = useState(null);
    const [user, setUser] = useState([]);
    const [allPageDetails,setAllPageDetails] = useState([]);
    const location = useLocation();
    const [indexSelect, setIndexSelect] = useState();
    const [pageId, setPageId] = useState(0);
    const [pageAccToken, setPageAccToken] = useState();
    const [pageLetter, setpageLetter] = useState("L")
    const [status, setstatus] = useState(null);
    const [quote, setquote] = useState("“Click Generate Button To Generate Quote”");
    const [qImage, setqImage] = useState(null);
    const history = useHistory();

    useEffect(() => {    
       setAcctoken(location.state.details.accessToken); 
       setUser(location.state.details);
    }, [location.state.details]);

    const fetchPageData = () =>{
        axios.get("https://graph.facebook.com/"+user.id+"/accounts?access_token="+acctoken)
        .then(resp =>{
            setAllPageDetails(resp.data);
        });
    }

    function onChangeSelector(event){
        const index = event.target.value;
        setIndexSelect(index);
        setPageId(allPageDetails.data[index].id);
        setPageAccToken(allPageDetails.data[index]?.access_token);
        setpageLetter(allPageDetails.data[index]?.name);
    }

    function onChangeStatus(event){
        setstatus(event.target.value);

    }

    const publishStatus = () =>{
        if(pageId !== 0 && status !== null){
            axios.post("https://graph.facebook.com/v11.0/"+pageId+"/feed/?message="+status+"&access_token="+pageAccToken)
            .then(resp =>{
                console.log("success!");
            });
            alert("Succesfully Updated!")
        }else{
            alert("Please Select Page Or Don't try to post empty status")
        }
    }

    const generateQuote = () =>{
            axios.get("https://api.quotable.io/random")
            .then(resp =>{
                setquote(resp.data.content);
            });
    }

    const publishQuote = () =>{
        if(pageId !== 0 && quote !== "“Click Generate Button To Generate Quote”"){
            axios.post("https://graph.facebook.com/v11.0/"+pageId+"/feed/?message="+quote+"&access_token="+pageAccToken)
            .then(resp =>{
                console.log("success!");
            });
            alert("Succesfully Updated!");
        }else{
            alert("Please Select Page Or Don't try to post empty Quote");
        }
    }

    const generateQuoteImg = () =>{
        setqImage("https://images.unsplash.com/photo-1606607291535-b0adfbf7424f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cXVvdGV8fHx8fHwxNjMzOTI4MjI2&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080");
        alert("Image Generated Succesfully!")
    }

    const publishPhoto = () =>{
        if(pageId !== 0 && qImage !==null){
            axios.post("https://graph.facebook.com/v11.0/"+pageId+"/photos?url="+qImage+"&access_token="+pageAccToken)
            .then(resp =>{
                console.log(resp.data);
            });
            alert("Succesfully Updated!");
        }else{
            alert("Please Select Page Or Generate Photo First");
        }
    }

    const logout = () => {          
        history.push({
            pathname: '/',
        });
    }

    return (
        <div>
            <Topbar />
            <div className="homeContainer">
                <div className="homeTopContainer">
                    <div className="topWrapper">
                        <div className="leftBoxHome">
                            <div className="leftImgBox">
                                <img src={user.picture?.data.url} alt="" className="profImage" />
                            </div>
                            <div className="userDetailsWrapper">
                                <div className="name">{user.name}</div>
                                <div className="userEmail">{user.email}</div>
                                <div className="userTown">{user.hometown?.name}</div>
                            </div>
                            <div className="pageCountWrapper">
                                <div className="pageCountTitle">
                                    Number Of Pages Belongs To You
                                </div>
                                <div className="hint">
                                    (click on the button to refresh)
                                </div>
                                <div className="pageCount">
                                    <button className="pageCountBtn" onClick={()=>fetchPageData()}>{allPageDetails.data?.length || 0}  <Refresh/></button>
                                </div>
                            </div>
                            <div className="logOutWrapper">
                                <div className="logoutIcon">
                                <a data-for="main" data-tip="Log Out" data-iscapture="true" href>
                                    <ExitToApp fontSize="large" onClick={()=>logout()}/>
                                </a>
                                <ReactTooltip id="main" place="bottom" type="dark" effect="float"/>
                                </div>
                            </div>
                        </div>
                        <div className="rightBoxHome">
                            <div className="pageDetailsWrapper">
                                <div className="pageSelectText">
                                    Select Page for Update Content
                                </div>
                                <div className="pageSelectOption">
                                    <select value={indexSelect} className="selectorSTyle" onChange={onChangeSelector}>
                                        <option value={-1}>Before Select Press Refresh Button</option>
                                        {allPageDetails.data?.map((pg,index) =>                                        
                                            <option key={pg.id} value={index}>{pg.name}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="pageLogoWrapper">
                                <div className="pageLogoImg">
                                    {pageLetter !== "L" ? pageLetter.charAt(0).toUpperCase() : "L"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="homeBottomWrapper">
                    <div className="homeLeftContainer">
                        <div className="leftTitleText">
                            Publish Status
                        </div>
                        <div className="leftImgContainer">
                            <img src="assest/status.png" alt="" className="leftImgCss" />
                        </div>
                        <div className="txtAreaContainer">
                            <textarea className="txtArea" name="" id="" rows="5" onChange={onChangeStatus} placeholder="Type Status Here..."></textarea>
                        </div>
                        <div className="leftBtnStatus">
                            <button className="publishBtn" onClick={()=>publishStatus()} disabled={pageId===0}>{pageId===0 ? "Select Page First" : "Publish Status"}</button>
                        </div>
                    </div>
                    <div className="homeMiddleContainer">
                        <div className="leftTitleText">
                            Generate Random Quote
                        </div>
                        <div className="leftImgContainer">
                            <img src="assest/quote.png" alt="" className="leftImgCss" />
                        </div>
                        <div className="txtAreaContainer">
                            <textarea className="txtArea" name="" id="" rows="5" value={quote}></textarea>
                        </div>
                        <div className="leftBtnStatus">
                            <button className="publishBtnBorder" onClick={()=>generateQuote()}>Generate Quote</button>
                        </div>
                        <div className="leftBtnStatus">
                            <button className="publishBtn" onClick={()=>publishQuote()} disabled={pageId===0}>{pageId===0 ? "Select Page First" : "Publish Quote"}</button>
                        </div>
                    </div>
                    <div className="homeRightContainer">
                        <div className="leftTitleText">
                            Generate Images
                        </div>
                        <div className="rightImgContainer">
                            <img src={qImage !== null ? qImage : "assest/qphoto.png"} alt="" className="rightImgCss" />
                        </div>
                        <div className="leftBtnStatus">
                            <button className="publishBtnBorder" onClick={()=>generateQuoteImg()}>Generate Photo</button>
                        </div>
                        <div className="leftBtnStatus">
                            <button className="publishBtn" onClick={()=>publishPhoto()} disabled={pageId===0}>{pageId===0 ? "Select Page First" : "Publish Photo"}</button>
                        </div>
                    </div>
                </div>
            </div>            
            <Footer />
        </div>
    )
}
