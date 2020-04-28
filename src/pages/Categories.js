import React, {useEffect, useState} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import API, { catchAxiosError } from '../utils/axiosEnv';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Card, CardActions, CardContent, CardHeader, IconButton} from "@material-ui/core";
import UserProfilePicture from "../components/User/ProfilePicture";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryUsers, setCategoryUsers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [paginationData, setPaginationData] = useState({pagesCount: 0, hasNext: false, pageSize: 1});
    useEffect(() => {
        (async () => getCategoriesList(1, 1))();
    }, []);

    const getCategoriesList = async (page ,size) => {
        const { response, error } = await API.get('/category/getList', {
            params: {page,size}
        }).catch(catchAxiosError);
        if(response && response.success){
            console.log(response.data.list);
            setCategories(response.data.list);
            setPaginationData({...paginationData, hasNext: !(paginationData.pagesCount === page), pagesCount: response.data.total_pages})
        }
        if(error) console.log(error);
    };

    const drawCategoryUsersList = (users) => {
      return (
          <ul className='user-list'>
              {
                  users.length > 0 && users.map((user, index) => (
                      <Card className='user' key={index}>
                          {user.background_image && (
                              <div className='user-back-image' style={{backgroundImage: `url(${user.background_image})`}}/>
                          )}
                          <CardHeader
                              className='card-header'
                              avatar={<UserProfilePicture image={user.profile_image}/>}
                              action={
                                  <IconButton aria-label="settings" size='medium' className='sub-menu'>
                                      <FontAwesomeIcon icon={['fab', 'buffer']}/>
                                  </IconButton>
                              }
                              title={<p className='user-name'>{user.name}</p>}
                              subheader={<p className='followers-count'>{user.username}</p>}
                          />
                          <CardContent className='user-description'>
                              {/*<p>{user.status_text.length < 100 ? user.status_text : `${user.status_text.substring(0, 100)}...`}</p>*/}
                          </CardContent>
                          <CardActions disableSpacing>
                              {/*<IconButton className={`follow ${data.followers.includes(user.id) ? 'following' : ''}`}*/}
                              {/*            aria-label="add to favorites"*/}
                              {/*            onClick={() => this.toggleFollow(user.id)}*/}
                              {/*>*/}
                              {/*    <FontAwesomeIcon className='fontAwesome-icon'*/}
                              {/*                     icon={[`${data.followers.includes(user.id) ? 'fas' : 'far'}`, 'heart']}/>*/}
                              {/*</IconButton>*/}
                              <IconButton aria-label="share">
                                  <FontAwesomeIcon className='fontAwesome-icon' icon={['far', 'dot-circle']}/>
                              </IconButton>
                              <p className='last-stream'>{`Last stream on ${user.online}`}</p>
                          </CardActions>
                      </Card>
                  ))}
          </ul>
      );
    };

  return (
      <div>
          <div className='page dashboard' style={{marginTop: '80px'}}>

              {!loading ? (
                  error ? (
                      <p>Error!</p>
                  ) : (
                      <div className='categories'>
                          {categories.length > 0 && categories.map((item, index) => (
                              <div className='category-wrapper' key={index}>
                                  <div className='category-title'>
                                      {item.icon && <img src={item.icon} alt={item.icon} width={50} height={20}/>}
                                      <h4>{item.name}</h4>
                                  </div>
                                  {item && item.users && item.users.length > 0 && drawCategoryUsersList(item.users)}
                              </div>
                          ))}
                          <Pagination
                              count={paginationData.pagesCount}
                              disabled={!(paginationData.pagesCount > 1)}
                              onChange={(e, pageNumber) => {
                                  (async () => {
                                      await getCategoriesList(pageNumber, paginationData.pageSize);
                                  })();
                              }}
                          />
                      </div>
                  )
              ) : (
                  <p>Loading...</p>
              )}

          </div>
      </div>
  );
};

export default Categories;