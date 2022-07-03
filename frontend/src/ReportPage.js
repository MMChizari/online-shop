import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function ReportPage(){
    const params = useParams();
    const [seller,setSeller] = useState({});
    useEffect(()=>{
        const data = {name:params.seller}
        fetch('http://localhost:3000/api/reports',{
            headers:{
                'Content-Type':'application/json'
            },
            method: 'POST',
            body:JSON.stringify(data)
        }).then(response=>response.json())
            .then(json=>{
                setSeller(json.shopping)
            })
    },[])
    return(
        <div className={"container"}>
            <h3 style={{textAlign:"center"}}>{seller.name} Reports</h3>
            <table className={"table table-dark"}>
                <thead>
                <tr>
                    <th>City</th>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Reports</th>
                </tr>
                </thead>
                <tbody>
                {seller.reports.map(report=><tr>
                    <td>{seller.city}</td>
                    <td>{report.date}</td>
                    <td>{report.product}</td>
                    <td>{
                        (report.options[1]!==undefined)? report.options[0]+' '+report.options[1]:report.options[0]
                    }</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}