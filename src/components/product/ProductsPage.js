import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

class ProductRow extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const product = this.props.product;
        const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>;
        
        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

ProductRow.propTypes = {
    product: React.PropTypes.object.isRequired,
    key: React.PropTypes.string.isRequired
};

class ProductCategoryRow extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <tr>
                <td colSpan="2">{this.props.category}</td>
            </tr>
        );
    }
}

ProductCategoryRow.propTypes = {
    category: PropTypes.string.isRequired
};

class ProductTable extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let rows = [];
        let lastCategory = null;

        console.log(this.props.products);

        this.props.products.forEach((product) => {
            if (product.category != lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
                lastCategory = product.category;
            }
            rows.push(<ProductRow product={product} key={product.name}/>);
        });

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

ProductTable.propTypes = {
    products: PropTypes.array.isRequired
};

class FilterableProductTable extends React.Component {
    render() {
        return (
            <ProductTable products={this.props.products}/>
        );
    }
}

class ProductsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1>Products</h1>
                <SearchBar/>
                <FilterableProductTable products={this.props.products} />
            </div>
        );
    }
}

class SearchBar extends React.Component {
    render() {
        return(
            <form>
                <div className="form-group">
                    <div className="field">
                        <input type="text" className="form-control" placeholder="Search ..."/>
                    </div>
                </div>
                <p>
                <input type="checkbox" />
                {' '}
                Only show products in stock
                </p>
            </form>
        );
    }
}

ProductsPage.propTypes = {
    products: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        products: state.products
    };
}


export default connect(mapStateToProps)(ProductsPage);