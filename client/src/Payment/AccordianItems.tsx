// Alan Castillo (#59078415)
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { CreditcardForm } from "./CreditcardForm"

export const AccordionItems = ({parentCallbacks}: {parentCallbacks: any[]}) => {
    const [ accordianKey, concessionCosts, paymentInfo, setAccordianKey, setConcessionCosts, setPaymentInfo, setHasConcessions] = parentCallbacks;

    const backgroundColor ="#87C3A5"
    const textColor = "#194d33"

    function CustomToggle({ children, eventKey }: { children:any, eventKey:string }) {
        const decoratedOnClick = useAccordionButton(eventKey);
      
        return (
            <div
                style={{ backgroundColor: backgroundColor, color: textColor, height:"60"}}
                onClick={decoratedOnClick}
            >
                {children}
            </div>
        );
    }

    return (
        <div>
            <Card>
                <Card.Header style={{ backgroundColor: backgroundColor }}>
                    <CustomToggle eventKey="creditcard">Credit Card and Billing Information</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="creditcard">
                    <Card.Body >
                        <CreditcardForm />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    );
};

export default AccordionItems;
