// Directory
import React, { Component } from "react";
import API from "../utils/API";
import DarkTable, { renderInfo } from "./table";
import { Container, Typography } from "@material-ui/core";
import SearchForm from "./searchForm";
import "./index.css";
// import { FormGroup, Label, Input } from "reactstrap"

const sortTypes = {
    up: {
        class: 'sort-up',
        fn: (a, b) => a.name - b.name
    },
    down: {
        class: 'sort-down',
        fn: (a, b) => b.name - a.name
    },
    default: {
        class: 'sort',
        fn: (a, b) => a
    }
}

class EmployeeContainer extends Component {
    state = {
        employeeInfo: [],
        lastName: "",
        filteredEmployees: [],

    }


    componentDidMount() {
        API.getUsers()
            .then((res) =>
                this.setState({
                    employees: res.data.results,
                    filteredEmployees: res.data.results,
                }))
            .catch((err) => console.log(err))
    }


    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState({ search: value });
        this.searchEmployees(value.trim())
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
    };


    searchEmployees = (val) => {
        if (val) {
            this.setState({
                filteredEmployees: this.state.employees.filter((employee) => {
                    return (
                        employee.name.first
                            .concat(" ", employee.name.last).toLowerCase()
                            .includes(val) ||
                        this.formatDate(employee.dob.date).includes(val)
                    );
                }),
            });
        } else {
            this.setState({ filteredEmployees: this.state.employees });
        }
    };

    formatDate = (date) => {
        date = new Date(date);
        let dob = [];
        dob.push("" + (date.getMonth() + 1))
        dob.push("" + date.getDate())
        dob.push(date.getFullYear())
        return dob.join("/")
    }
    onSortChange = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        this.setState({
            currentSort: nextSort
        })
    }


    render() {


        return (
            <Container >
                <Typography variant="h4" className="header">Employee Directory</Typography>
                <SearchForm
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit} />
                <DarkTable
                    state={this.state}
                    filterEmployees={this.filterEmployees}
                    formatDate={this.formatDate}
                />
            </Container>
        )
    }

}


export default EmployeeContainer;
