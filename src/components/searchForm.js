import { FormGroup, Label, Input } from "reactstrap";
import React from "react"

const SearchForm = (props) => {

    return (
        <FormGroup>
            <Label for="exampleSearch">Search</Label>
            <Input
                onSubmit={props.handleFormSubmit}
                className="form-control"
                value={props.value}
                name="search"
                onChange={props.handleInputChange}
                type="search"
                placeholder="Search for Employee"
            />

        </FormGroup>
    )
}

export default SearchForm;