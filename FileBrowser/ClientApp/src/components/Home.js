import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
            <p>This is a proof of concept project to fulfill the following requirements</p>
            <code>
                Design a full working solution for browsing files on a server's machine. Your application should consist of 
                <br />
                - a backend which would serve the file system directories and filenames
                <br />
                - a frontend based in React that would allow the client to browse the files. This will include basic information about the files and clickable directories to navigate to different directories. Each directory except the root should have a `..` directory which allows navigating to the parent dir.  You don't need to serve the files. Just filenames, file sizes, and directories.
                <br />
            </code>
            <br />
            <p>Please navigate to <Link to='/browse'>Browse</Link> page to see work done.</p>
      </div>
    );
  }
}
