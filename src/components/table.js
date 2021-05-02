import React from 'react';
import { Table } from 'reactstrap';

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

const DarkTable = (props) => {
    const { currentSort } = props.state;
    // eslint-disable-next-line no-undef
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
    return (

        <Table dark>
            <thead className="ml-3">
                <tr>
                    <th>Picture</th>
                    <th>Name
                    <button onClick={this.onSortChange}>
                            {sortTypes[currentSort].class}
                        </button>
                    </th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>DOB</th>
                </tr>
            </thead>
            <tbody>
                {props.state.filteredEmployees.map((employee) => {
                    const { first, last } = employee.name;
                    const fullName = `${first} ${last}`;

                    const dob = props.formatDate(employee.dob.date);

                    return (
                        <tr>
                            <td>{employee.Image}</td>
                            <td>{fullName}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.email}</td>
                            <td>{dob}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </Table>
    );
}

export default DarkTable;