import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

// the concepts from this page come from the Thinking in React tutorial, here:
// https://reactjs.org/docs/thinking-in-react.html
class ProductRow extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const product = this.props.product;
        const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name} (out of stock)</span>;
        
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
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        let rows = [];
        let lastCategory = null;

        //console.log(this.props.products);

        this.props.products.forEach((product) => {
            // doesn't match filter
            if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }

            // doesn't match stock filter
            if (inStockOnly && !product.stocked) {
                return;
            }

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
    products: PropTypes.array.isRequired,
    filterText: PropTypes.string.isRequired,
    inStockOnly: PropTypes.bool.isRequired
};

class FilterableProductTable extends React.Component {
    render() {
        return (
            <ProductTable products={this.props.products} filterText={this.props.filterText} inStockOnly={this.props.inStockOnly}/>
        );
    }
}

FilterableProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    filterText: PropTypes.string.isRequired,
    inStockOnly: PropTypes.bool.isRequired
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handlerFilterTextChange = this.handlerFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handlerFilterTextChange(event) {
        this.props.filterTextOnChange(event.target.value);
    }

    handleInStockChange(event) {
        this.props.inStockOnlyOnChange(event.target.checked);
    }

    render() {
        return(
            <form>
                <div className="form-group">
                    <div className="field">
                        <input type="text" className="form-control" placeholder="Search ..." value={this.props.filterText} onChange={this.handlerFilterTextChange}/>
                    </div>
                </div>
                <p>
                    <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockChange} />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

SearchBar.propTypes = {
    filterTextOnChange: PropTypes.func.isRequired,
    inStockOnlyOnChange: PropTypes.func.isRequired
};

class ProductsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { filterText: '', inStockOnly: false };
        this.filterTextOnChangeHandler = this.filterTextOnChangeHandler.bind(this);
        this.inStockOnlyOnChangeHandler = this.inStockOnlyOnChangeHandler.bind(this);
    }

    filterTextOnChangeHandler(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    inStockOnlyOnChangeHandler(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        });
    }

    render() {
        return (
            <div>
                <h1>Products</h1>
                <SearchBar filterText={this.state.filterText}
                           inStockOnly={this.state.inStockOnly}
                           filterTextOnChange={this.filterTextOnChangeHandler}
                           inStockOnlyOnChange={this.inStockOnlyOnChangeHandler}
                />
                <FilterableProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
            </div>
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