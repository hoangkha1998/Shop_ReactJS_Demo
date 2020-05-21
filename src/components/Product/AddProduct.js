import React from 'react';
import API from '../../Config/Api';
import FormError from '../FormError';
import CheckLogin from '../../Config/CheckLogin';
class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBrand: [],
            listCategory: [],
            name: '',
            price: '',
            company_profile: '',
            status: 0,
            detail: '',
            brand: '',
            category: '',
            sale: 0,
            images: [],
            files: [],
            formError: [],
            userLogin: new CheckLogin()
        }
    }
    componentDidMount() {
        API.get('/category-brand')
            .then(res => {
                if (res.data.message == 'success') {
                    this.setState({
                        listCategory: res.data.category,
                        listBrand: res.data.brand
                    })
                }
            })
            .catch(err => {

            })
    }
    renderSelectCategory = () => {
        const { listCategory } = this.state;
        return (
            <select name="category" value={this.state.category} onChange={this.handleChange}>
                <option value="">Please choose category</option>
                {listCategory.map((value, key) => {
                    return (
                        <option key={key} value={value.id}>{value.category}</option>
                    )
                })}
            </select>
        )

    }
    renderSelectBrand = () => {
        const { listBrand } = this.state;
        return (
            <select name="brand" value={this.state.brand} onChange={this.handleChange}>
                <option value="">Please choose branch</option>
                {listBrand.map((value, key) => {
                    return (
                        <option key={key} value={value.id}>{value.brand}</option>
                    )
                })}
            </select>
        )

    }

    handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    handleCheckExtensionFile = (nameFile) => {
        let arrExtension = ['jpg', 'png', 'gif'];
        let file = nameFile.split('.');
        if (arrExtension.indexOf(file[1]) != -1) {
          return true;
        }
        return false;
      }
    handleFile = (e) => {
        const { formError, images, file } = this.state;
        e.preventDefault();
        let files = e.target.files;
        if (files.length > 3 || images.length > 3) {
            formError.file = " qua so luong";
            this.setState({
                formError: formError
            })
            return false;
        } else {            
            Object.keys(files).map((value, index) => {                
                if(!this.handleCheckExtensionFile(files[value].name)){
                    formError.file="dinh dang khong ho tro";
                    this.setState({
                        formError:formError
                    })
                    return false;
                }                             
            })            
            this.setState({
                files: files
            })         
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, price, category, brand, company_profile, detail, files, images, userLogin,sale } = this.state;
        let flag = true;
        let {formError}=this.state;
        formError={};
        if (name == '') {
            formError.name = "Nhap name";
            flag = false;
        }
        if (price == '') {
            formError.price = "Nhap price";
            flag = false;
        }
        if (category == '') {
            formError.category = "Chon category";
            flag = false;
        }
        if (brand == '') {
            formError.brand = "Chon brand";
            flag = false;
        }
        if (company_profile == '') {
            formError.company_profile = "Nhap company profile";
            flag = false;
        }
        if (detail == '') {
            formError.detail = "Nhap detail";
            flag = false;
        }
        if (files.length == 0) {
            formError.file = "Chon file";
            flag = false;
        }
        this.setState({
            formError: formError
        })
        if (flag) {            
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + userLogin.getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            let formData = new FormData();
            let {files} = this.state;
            formData.append('name', name);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('brand', brand);
            // formData.append('image', file);
            formData.append('sale', sale);
            formData.append('detail', detail);
            formData.append('company', company_profile); 
            Object.keys(files).map((key, index)=> {
                formData.append('file[]', files[key]);
            })
            
            API.post('/user/add-product', formData, config)
                .then(res => {
                    if(res.data.response == 'success'){
                        this.props.history.push("/account/product/list");
                    }
                    
                })
                .catch(err => {
                    console.log(err);

                })
        }
    }
    render() {
        const { name, price, company_profile, detail, formError, files, images, sale ,status} = this.state; 
        // console.log(files);         
        return (
            <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                <span>Create Product</span>
                <div className="form-group alert-danger">
                    <FormError formError={formError} />
                </div>
                <div className="form-group">
                    <label >Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name" name="name" value={name} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label >Price</label>
                    <input type="text" className="form-control" placeholder="Enter price" name="price" value={price} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    {this.renderSelectCategory()}
                </div>
                <div className="form-group">
                    {this.renderSelectBrand()}
                </div>
                <div className="form-group">
                    <select name="status" value={status} onChange={this.handleChange} >
                        <option value="0"> Select status</option>
                        <option value="2">Sale</option>
                        <option value="1">New</option>
                    </select>
                </div>
                {
                    status == 2 ? 
                    <div className="form-group">
                        <label >Sale</label>
                        <input type="text" className="form-control" placeholder="Sales" name="sale" value={sale} onChange={this.handleChange} />
                    </div> : ''
                }

                <div className="form-group">
                    <label >Company Profile</label>
                    <input type="text" className="form-control" placeholder="Company Profile" name="company_profile" value={company_profile} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label >Images</label>
                    <input type="file" className="form-control" name="images[]" multiple onChange={this.handleFile} />
                    {/* <img src={AvatarImage + avatar} alt="image" width="300px" height="auto" id="xxx"/> */}
                </div>
                <div className="form-group">
                    <label >Detail</label>
                    <textarea name="detail" value={detail} onChange={this.handleChange}></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mb-30">Add Product</button>
                </div>

            </form>
        )
    }
}
export default AddProduct