import './ManageItems.css';
import ItemForm from "../../components/ItemForm/ItemForm.jsx";
import ItemList from "../../components/ItemList/ItemList.jsx";

const ManageItems = () => {
    return (
        <div className="items-wrapper">
            <div className="items-container">
                <div className="left-column">
                    <div className="form-card">
                        <h2 className="section-title">Add/Edit Item</h2>
                        <div className="form-content">
                            <ItemForm />
                        </div>
                    </div>
                </div>
                <div className="right-column">
                    <div className="list-card">
                        <h2 className="section-title">Item List</h2>
                        <div className="list-content">
                            <ItemList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;