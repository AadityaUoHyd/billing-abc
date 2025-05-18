import './ManageCategory.css';
import CategoryForm from "../../components/CategoryForm/CategoryForm.jsx";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";

const ManageCategory = () => {
    return (
        <div className="category-wrapper">
            <div className="category-container">
                <div className="left-column">
                    <div className="form-card">
                        <h2 className="section-title">Add/Edit Category</h2>
                        <div className="form-content">
                            <CategoryForm />
                        </div>
                    </div>
                </div>
                <div className="right-column">
                    <div className="list-card">
                        <h2 className="section-title">Category List</h2>
                        <div className="list-content">
                            <CategoryList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCategory;