import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import { Button, TextField } from '@material-ui/core';

const StoreApp = (props) => {
  return <TableRow>
    <TableCell>{props.name}</TableCell>
    <TableCell>{props.description}</TableCell>
    <TableCell>{props.status}</TableCell>
  </TableRow>
}

class StoreAppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apps: []
    };
  }

  componentDidMount = () => {
    this.fetchApps();
  }

  fetchApps = () => {
    const url = "/api/app";
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.setState({
        apps: data
      });
    });
  }

  render() {
    return (<div>
      <TableContainer>
        <Table aria-label="table">
          <TableHead>
            <TableRow key={"title"}>
              <TableCell colSpan={4} style={ {textAlign: 'center'} }>
                <h4>App Store</h4>
              </TableCell>
            </TableRow>
            <StoreApp name="Name" description="Description" status="Status" />
            {this.state.apps.map((app) =>
              <StoreApp name={app.organization + "/" + app.name} 
                        description={app.description} 
                        status={ (app.installed_at === null) ? "Not installed" : "Installed" } />
            )}
          </TableHead>
        </Table>
      </TableContainer>
    </div>);
  }
};

export default StoreAppHeader;
