import React from "react";
import {Link } from "react-router-dom";

 function SignIn() {

     return (
       <div>
         <p>
           This is the first page.
           <br />
           Click on the button below.
         </p>
         <Link to="/signup"><button>
           Go to Page 2 
         </button>
         </Link>
       </div>
     );

 }

 export default SignIn;