// Alan Castillo (#59078415)

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export const CreditcardForm = () => {
    const statesArr = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']; 
    const bottomMargin = "15px";

    const renderedStatesOptions = statesArr.map((stateStr) => {
        return (
            <option key={stateStr}>{stateStr}</option>
        )
    })

    return (
        <div>
            <form>
                <div className="form" style={{display: "flex", marginBottom: bottomMargin}}>
                    <div className="form-group col-md-5" style={{marginRight: "20px"}}>
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First name"/>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="inputLName">Last Name</label>
                        <input type="text" className="form-control" id="inputLName" placeholder="Last name"/>
                    </div>
                </div>
                <div className="form-row" style={{display: "flex", marginBottom: bottomMargin}}>
                    <div className="form-group col-md-5" style={{marginRight: "20px"}}>
                        <label htmlFor="inputCard">Card Number</label>
                        <input type="text" className="form-control" id="inputCard" placeholder="Card Number"/>
                    </div>
                    <div className="form-group col-md-3" style={{marginRight: "20px"}}>
                        <label htmlFor="inputSec">Security Number</label>
                        <input type="text" className="form-control" id="inputSec" placeholder="Sec Num"/>
                    </div>
                    <div className="form-group col-md-3">
                    <label htmlFor="inputExp">Card Expiration</label>
                        <input type="text" className="form-control" id="inputExp" placeholder="Exp Date"/>
                    </div>
                </div>
                <div className="form-row" style={{marginBottom: bottomMargin}}>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                    </div>
                </div>
                <div className="form-group col-md-6" style={{marginBottom: bottomMargin}}>
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                </div>
                <div className="form-group col-md-6" style={{marginBottom: bottomMargin}}>
                    <label htmlFor="inputAddress2">Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                </div>
                <div className="form-row" style={{display: "flex", marginBottom:bottomMargin}}>
                    <div className="form-group col-md-5"  style={{marginRight: "20px"}}>
                        <label htmlFor="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity"/>
                    </div>
                    <div className="form-group col-md-3"  style={{marginRight: "20px"}}>
                        <label htmlFor="inputState">State</label>
                        <select id="inputState" className="form-control">
                            <option defaultValue={""}></option>
                            {renderedStatesOptions}
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input type="text" className="form-control" id="inputZip"/>
                    </div>
                </div>
            </form>
        </div>
    );
}