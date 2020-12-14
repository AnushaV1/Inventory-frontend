import React, {useState, useMemo} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';
import { useSelector, useDispatch } from "react-redux";
import { deleteSingleRow, updateSingleRow, showReceiptImage } from "../actions/userInventoryActions";
import { useTable, useBlockLayout, useRowState } from 'react-table';
import { ModalManager} from 'react-dynamic-modal';
import MyModal from "./MyModal";
import { addAlert } from "../actions/alertActions";
import defaultLogo from "../images/default-no-image.png";



const EditableCell = ({
    value: initialValue,
    row: { index , original },
    column: { id },
    isEditing,
    updateMyData, 
}) => {
    
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        updateMyData(original, index, id, value)
    }

    React.useEffect(() => {
    setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} style={{width: '100px', background: 'transparent'}} />
}

const defaultColumn = {
    Cell: EditableCell,
}

const UserProductTable = ({products}) => {
    const dispatch = useDispatch();
    const [data, setData] = React.useState(products)
    const[image, setImage] = useState("")   
    const currentUser = useSelector(st => st.users.user);
    const upcList = useSelector(st=>st.upc)
    const userId = currentUser.userid;

        const updateMyData = (original, rowIndex, columnId, value) => {
            try {
                dispatch(updateSingleRow(original.id, columnId,value))
                setData(old =>
            
            old.map((row, index) => {
                if (index === rowIndex) {
                return {
                    ...old[rowIndex],
                    [columnId]: value,
                }
                }
                return row
            })
            )
        } catch (err) {
            dispatch(addAlert(`Unable to update field`, 'danger'));
        }
        }

    const columns = useMemo(()=> [
        {
            Header: 'UPC',
            accessor:'upc', 
        Cell: e => <button className="btn btn-link" onClick={()=> {

            let m = upcList.findIndex(function(item) {
                return item.upc_code === e.value;
            });

            if(m < 0) {
                dispatch(addAlert('No such UPC code', 'danger')); 
            } else {
                let upcObj = upcList[m]
                ModalManager.open(<MyModal upcObj={upcObj} onRequestClose={() => true}/>);
            }

            }
        }>
        {e.value} </button>
        },
        {
            Header: 'Product',
            accessor:'product_name',
            className: 'colorClass'
            
        },
        {
            Header: 'Serial No.',
            accessor:'serial_number',
        },
        {
            Header: 'Price',
            accessor:'product_price',

        },
        {
            Header: 'Store',
            accessor:'purchased_at',
        },
        {
            Header: 'Purchase Date',
            accessor:'purchase_date',
            Cell: tableProps => {
                return (tableProps.row.original.purchase_date.substring(0,10))
            }
        },
        {
            Header: 'Warranty',
            accessor:'warranty_period',
        },
        {
            Header: 'Return policy',
            accessor:'return_policy',

        },
        {
            Header: 'Manual Link',
            accessor:'manual_link',
            Cell: e => <a href={e.value} target="_blank" rel="noreferrer"> Click here </a>
        },
        {
            Header: "Receipt",
            accessor: "receipt_image",
            Cell: tableProps => {
                if(tableProps.row.original.receipt_image !== " ") {
                return (
                    <button className="" onClick= {async ()=>  {
                        const filename= tableProps.row.original.receipt_image;
                        const resp = await dispatch(showReceiptImage(filename))
                        setImage(resp)
                    }}>
                    <i className="far fa-image"></i></button>
                )
            } else {
                        return (
                        <img src={defaultLogo} alt={`${defaultLogo}-tableProps.row.original.id`} width="50px" height="50px" />
                        )
                    }
    }
        },
        {
            Header: "Product Image",
            accessor: "user_product_image",
            Cell: tableProps => {
                if(tableProps.row.original.user_product_image !==" ") {
                return (
                    <button className="" onClick= {async ()=>  {
                        const filename= tableProps.row.original.user_product_image;
                        const resp = await dispatch(showReceiptImage(filename))
                        setImage(resp)
                    }}>
                    <i className="far fa-image"></i></button>
                )
            } else {
                return (
                    <img src={defaultLogo} alt={`${defaultLogo}-tableProps.row.original.id`} width="50px" height="50px" />
                )
            }
            }
        },
        {
            Header: 'Actions',
            Cell: tableProps => {
                return (
                    <button onClick= {()=>  {
                        try {
                        dispatch(deleteSingleRow(userId,tableProps.row.original.id))
                        const dataCopy = [...products]
                        dataCopy.splice(tableProps.row.index, 1);
                        setData(dataCopy);
                        setImage("")
                    } catch(err) {
                        dispatch(addAlert('Error deleting the row', 'danger'));
                    }
                        }}>
                        <i className="far fa-trash-alt"></i></button>
                )
            },
            sortable: false,
            filterable: false,
        }
        ]
        , [userId, products, dispatch, upcList])

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow
        } = useTable({
            columns,
            data: data,
            defaultColumn,
            updateMyData,
            }, useBlockLayout, useRowState)

    return (
    
            <>
        <div className="container-fluid" style= {{marginTop: '30px', overflow:'scroll' }}>
        <div>{image && <img src={image} alt={image} style={{width: '400px', height: '300px',  marginTop: '20px', marginBottom: '50px'}}/>}</div>
        <div style= {{marginTop: '30px' }}>
        <BTable striped bordered hover {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}

                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}> 
            {rows.length > 0 && rows.map((row) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}> 
                    {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    </tr>
                )
            })}
            </tbody>
            </BTable>
            </div>
            </div>
            </>
);
    
}

export default UserProductTable;