import React from 'react';

import { Link } from 'react-router-dom';

import "./styles.css";

import backToIcon from "../../assets/images/icons/back.svg";
import logo from "../../assets/images/logo.svg";

interface PageHeaderProps {
  title: string;
  description?: string; 
}
/*
  ways to create a React Component:

    *React.FC (FC = FunctionComponent) 
    *React.FunctionComponent
    *using arrow function or a function
*/
const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return(
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backToIcon} alt="Voltar"/>
        </Link>
        <img src={logo} alt="Proffy"/>
      </div>
      <div className="header-content">
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}

      {props.children}
      </div>
    </header>
  );

}

export default PageHeader;