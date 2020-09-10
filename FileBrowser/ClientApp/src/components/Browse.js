import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const pageSize = 10;

export function Browse(props) {

    const [isLoading, setIsLoading] = useState();
    const [data, setData] = useState({ count: 0, items: [] });
    const [page, setPage] = useState(0);

    const path = props.match.params.path || "";

    const totalPages = Math.ceil(data.count / pageSize);

    useEffect(() => {
        (async () => {
            let params = {
                skip: page * pageSize,
                take: pageSize
            };

            if (path) {
                params.path = path;
            }

            const url = 'api/browse?' + new URLSearchParams(params).toString();

            setIsLoading(true);
            const response = await fetch(url);
            setData(await response.json());
            setIsLoading(false);

        })();
    }, [path, page]);

    const formatDate = x => new Date(x).toLocaleString();

    return (
        <>
            {isLoading && <div style={{ float: 'right' }}> Loading...</div>}
            <h3>Contents of {path || 'root folder'}</h3>

            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size (in bytes)</th>
                        <th>Creation Time</th>
                        <th>Last Access Time</th>
                        <th>Last Write Time</th>
                    </tr>
                </thead>
                <tbody>
                    {!!path && (
                        <tr>
                            <td colSpan={100}>
                                <Link to={`/browse/${path.substr(0, path.lastIndexOf('/'))}`}>..</Link>
                            </td>
                        </tr>
                    )}
                    {data.items.map(x => (
                        <tr key={x.name}>
                            <td>
                                {!x.isDirectory ? x.name : <Link to={`/browse/${path}${path ? '/' : ''}${x.name}/`}>{x.name}</Link>}
                            </td>
                            <td>{x.isDirectory ? '' : x.length}</td>
                            <td>{formatDate(x.creationTime)}</td>
                            <td>{formatDate(x.lastAccessTime)}</td>
                            <td>{formatDate(x.lastWriteTime)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={100}>
                            <center>
                                {data.count} total items.
                                    <br />
                                Showing page {page + 1} of {totalPages}
                                <br />
                                <Button disabled={page <= 0} onClick={() => { setPage(x => x - 1); }}>Prev Page</Button>
                                &nbsp;
                                    <Button disabled={page + 1 >= totalPages} onClick={() => { setPage(x => x + 1); }}>Next Page</Button>
                            </center>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}
