import _ from 'lodash';
import jsonplaceholder from '../apis/jsonPlaceHolder';

// (dispatch, getstate) are 2 parameters sent in to redux thunk
export const fetchPostsandUsers = () => async (dispatch,getState) => {
  await dispatch(fetchPosts());

  // using lodash functions to get unique users

  // const userIds = _.uniq(_.map(getState().posts,'userId')); 
  // userIds.forEach(id => dispatch(fetchUser(id)));

  // or
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();

}

export const fetchPosts = () => async dispatch => {
    const { data } = await jsonplaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: data });
};

export const fetchUser = id => async dispatch => {
    const response = await jsonplaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
 };


//  const _fetchUser =  _.memoize(async(id,dispatch) => { 
//   const response = await jsonplaceholder.get(`/users/${id}`);
//     dispatch({
//       type: 'FETCH_USER',
//       payload: response.data
//     });
//  });

// export const fetchUser = _.memoize(function(id) {
//   return _.memoize(async function(dispatch) {
//     const response = await jsonplaceholder.get(`/users/${id}`);
//     dispatch({
//       type: 'FETCH_USER',
//       payload: response.data
//     });
    
//   });
// });