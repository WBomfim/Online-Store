import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { addComment, setProductComments, getUserComment } from '../services/UserComments';
import './userComments.css';

class UserComments extends Component {
  constructor(props) {
    super(props);
    const { itemId } = props;
    this.state = {
      comment: '',
      email: '',
      evaluation: 0,
      productComments: '',
      productId: itemId,
      hasComments: false,
    };
  }

  componentDidMount() {
    this.handleComments();
  }

  handleComments = async () => {
    const { productId } = this.state;
    const comments = await getUserComment(productId);
    if (comments) {
      this.setState({
        hasComments: true,
        productComments: comments,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { itemId } = this.props;
    setProductComments(itemId);
    const { comment, evaluation, email } = this.state;
    addComment(itemId, comment, evaluation, email);
    this.handleComments();
    this.setState({
      comment: '',
    });
  }

  starExhibition = (star) => {
    const number = [];
    for (let i = 0; i < star; i += 1) {
      number.push(<FaStar />);
    }
    return number;
  }

  render() {
    const { comment, evaluation, email, productComments, hasComments } = this.state;
    return (
      <div className="user-comments-container">

        <form>
          <div
            className="rating"
            value={ evaluation }
            onChange={ this.handleChange }
            required
          >

            <label htmlFor="1">
              1
              <input
                data-testid="1-rating"
                type="radio"
                value="1"
                id="1"
                name="evaluation"
              />
            </label>
            <label htmlFor="2">
              2
              <input
                data-testid="2-rating"
                type="radio"
                value="2"
                id="2"
                name="evaluation"
              />
            </label>
            <label htmlFor="3">
              3
              <input
                data-testid="3-rating"
                type="radio"
                value="3"
                id="3"
                name="evaluation"
              />
            </label>
            <label htmlFor="4">
              4
              <input
                data-testid="4-rating"
                type="radio"
                value="4"
                id="4"
                name="evaluation"
              />
            </label>
            <label htmlFor="5">
              5
              <input
                data-testid="5-rating"
                type="radio"
                value="5"
                id="5"
                name="evaluation"
              />
            </label>
          </div>
          <br />
          <textarea
            name="comment"
            data-testid="product-detail-evaluation"
            className="comment-area"
            cols="30"
            rows="10"
            value={ comment }
            onChange={ this.handleChange }
            placeholder="Deixe seu comentário aqui"
          />
          <br />
          <label htmlFor="email">
            Seu Email:
            <input
              className="email-comment"
              name="email"
              id="email"
              type="email"
              data-testid="product-detail-email"
              placeholder="exemplo: seuemail@seuemail.com"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            type="button"
            className="button-comments"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
          >
            Enviar
          </button>
        </form>

        <div className="comment-card">
          { hasComments ? productComments.map((userComment, index) => (
            <div className="user-comment" key={ index }>
              <h4>
                {this.starExhibition(userComment.evaluation)}
              </h4>
              <p>
                Comentário:
                {' '}
                { userComment.comment }
              </p>
              <p>{ userComment.email }</p>

            </div>
          )) : <p>Ainda não há comentarios</p> }
        </div>
      </div>
    );
  }
}

UserComments.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default UserComments;
