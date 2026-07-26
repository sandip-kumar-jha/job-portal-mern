import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CompanyTable = () => {


    const { companies, searchCompanyByText } = useSelector(
        store => store.company
    );


    const navigate = useNavigate();



    const filteredCompany = companies?.filter((company)=>{

        if(!searchCompanyByText){
            return true;
        }

        return company.name
        .toLowerCase()
        .includes(searchCompanyByText.toLowerCase());

    });



    return (

        <div>


            <Table>


                <TableCaption>
                    Your registered companies
                </TableCaption>


                <TableHeader>

                    <TableRow>

                        <TableHead>
                            Logo
                        </TableHead>


                        <TableHead>
                            Name
                        </TableHead>


                        <TableHead>
                            Date
                        </TableHead>


                        <TableHead className="text-right">
                            Action
                        </TableHead>


                    </TableRow>


                </TableHeader>



                <TableBody>


                    {

                    filteredCompany?.map((company)=>(


                        <TableRow key={company._id}>


                            <TableCell>

                                <img
                                    src={company.logo}
                                    className="w-10 h-10 rounded-full"
                                />

                            </TableCell>



                            <TableCell>

                                {company.name}

                            </TableCell>



                            <TableCell>

                                {
                                    company.createdAt
                                    ?.split("T")[0]
                                }

                            </TableCell>



                            <TableCell className="text-right">


                                <Button

                                onClick={()=>navigate(`/admin/companies/${company._id}`)}

                                variant="outline"

                                >

                                    Edit

                                </Button>


                            </TableCell>



                        </TableRow>


                    ))

                    }


                </TableBody>


            </Table>


        </div>

    )
}


export default CompanyTable;