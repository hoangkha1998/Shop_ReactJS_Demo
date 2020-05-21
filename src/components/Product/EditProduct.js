import React from 'react';
import API from '../../Config/Api';
import FormError from '../FormError';
import CheckLogin from '../../Config/CheckLogin';
import { ProductImage } from '../../Config/Constants';
import '../../App.css';
class EditProduct extends React.Component {
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
            file: [],
            formError: [],
            userLogin: new CheckLogin(),
            id: this.props.match.params.id,
            avatarCheckBox: []

        }
    }
    componentDidMount() {
        const { userLogin, id } = this.state;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + userLogin.getToken(),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        API.get('/user/product/' + id, config)
            .then(res => {
                if (res.data.response == 'success') {
                    const data = res.data.data;
                    this.setState({
                        brand: data.id_brand,
                        category: data.id_category,
                        company_profile: data.company_profile,
                        detail: data.detail,
                        name: data.name,
                        price: data.price,
                        sale: data.sale,
                        status: data.status,
                        images: data.image
                    })

                }
            })
            .catch(err => {

            })
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
        const { formError, images } = this.state;        
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
                file: files
            })
        }

    }
    handleDeleteImage = (e) => {        
        const { avatarCheckBox } = this.state;
        let img = e.target.value;
        if (avatarCheckBox.indexOf(img) == -1) {
            let arrImg = avatarCheckBox;
            arrImg.push(img);
            this.setState({
                avatarCheckBox: arrImg
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, price, category, brand, company_profile, detail, file, images, userLogin, sale,avatarCheckBox } = this.state;
        let flag = true;
        let {formError}=this.state ;
        formError = {};
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
        if (file.length == 0) {
            formError.file = "Chon file";
            flag = false;
        }
        if(file.length+(images.length-avatarCheckBox.length) > 3){
            formError.file = "Qua so file quy dinh";
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
            formData.append('name', name);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('brand', brand);
            // formData.append('image', file);
            formData.append('sale', sale);
            formData.append('detail', detail);
            formData.append('company', company_profile);
            Object.keys(file).map((key, index)=> {
                formData.append('file[]', file[key]);
            })
            Object.keys(avatarCheckBox).map((key, index)=> {
                formData.append('avatarCheckBox[]', avatarCheckBox[key]);
            })
            
            
            API.post('/user/edit-product/'+this.props.match.params.id, formData, config)
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
        const { name, price, company_profile, detail, formError, file, images, sale, status, userLogin, avatarCheckBox } = this.state;
        // console.log(avatarCheckBox);
        // console.log(file);
        return (
            <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                <span>Update Product</span>
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

                </div>
                <div className="form-group ">
                    <ul className="list-inline">
                        {
                            images.map((value, index) => {
                                return (
                                    <li className="list-inline-item text-center" key={index}>
                                        <img src={ProductImage + userLogin.getProfile().id + "/" + value} alt="image" className="imgProduct" />
                                        <input value={value} type="checkbox" name="avatarCheckBox[]" className="checkBoxImg" onClick={this.handleDeleteImage} />
                                    </li>

                                )

                            })
                        }
                    </ul>

                </div>
                <div className="form-group">
                    <label >Detail</label>
                    <textarea name="detail" value={detail} onChange={this.handleChange}></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mb-30">Update Product</button>
                </div>

            </form>
        )
    }
}
export default EditProduct