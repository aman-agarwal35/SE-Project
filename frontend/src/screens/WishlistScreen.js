import React , {useEffect} from 'react'
import {addToWishList,removeFromWishList} from '../actions/wishlistActions'
import {useDispatch , useSelector} from 'react-redux'
import Message from '../components/Message'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import {Link } from 'react-router-dom'


const WishlistScreen = ({match,location,history}) => {
    const productId = match.params.id
    const dispatch = useDispatch()   

    const wishlist = useSelector(state=> state.wishlist)
    const {wishlistItems} = wishlist
    useEffect(()=>{
        if(productId){
          dispatch(addToWishList(productId))
        //   console.log("added to wishlist")
        }
      },[dispatch,productId])

    // console.log(wishlistItems)

      const removeFromWishlistHandler = (id)=>{
          console.log("remove from wishlist handler")
          dispatch(removeFromWishList(id))
      }

    return (
        <Row>
          <Col md={8}>
            <h1>Your Wish List</h1>
            {wishlistItems.length===0? <Message>Your wish list is empty <Link to='/'>Go Back</Link> </Message> : (
              <ListGroup variant='flush'>
                {wishlistItems.map(item => (<ListGroup.Item key={item.product}>
                   <Row>
                     <Col md={2}>
                       <Image src={item.image} alt={item.name}  fluid rounded></Image>                   
                       </Col>
                       <Col md={3}>
                         <Link to={`/product/${item.product}`}>{item.name}</Link>
                         </Col>
                         <Col md={2}>${item.price}</Col>
                        <Col md={2}>
                             <Button type='button' variant='light' onClick={()=> removeFromWishlistHandler(item.product)}>
                               <i className='fas fa-trash'></i>
                               </Button>
                        </Col>
                   </Row>
                  </ListGroup.Item>))}
                </ListGroup>
            )}
          </Col>
           {/* <Col md={4}>
             <Card>
               <ListGroup variant='flush'>
                 <ListGroup.Item>
                   <h2>Subtototal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h2>
    
    
                    ${cartItems.reduce((acc,item) => acc+item.qty * item.price,0).toFixed(2)}
    
                 </ListGroup.Item>
                 <ListGroup.Item>
                   <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                     Procced To Checkout
                     </Button>
                 </ListGroup.Item>
                 </ListGroup>
             </Card>
             </Col> */}
           
        </Row>
      )
}

export default WishlistScreen
