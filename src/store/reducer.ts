import {createReducer} from '@reduxjs/toolkit';
import {Offer, OfferDetail, City} from '../types/offer';
import {Comment} from '../types/comment';
import {DEFAULT_CITY, CITIES, AuthorizationStatus, RequestStatus} from '../const';
import {fetchOffers, fetchOffer, fetchNearOffers, fetchComments, fetchFavorites, postComment, dropSendingStatus, dropOffer, setActiveCity, setOffersDataLoadingStatus, setOfferDataLoadingStatus, requireAuthorization} from './actions';
import {postCommentAction} from './api-actions';

const initialState: {
  offers: Offer[];
  nearOffers: Offer[];
  comments: Comment[];
  offer: OfferDetail | null;
  favorites: Offer[];
  activeCity: City;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  sendingCommentStatus: string;
} = {
  offers: [],
  nearOffers: [],
  comments: [],
  offer: null,
  favorites: [],
  activeCity: DEFAULT_CITY,
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  sendingCommentStatus: RequestStatus.Unsent
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(fetchOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(fetchNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(fetchComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(fetchFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(postComment, (state, action) => {
      state.comments.push(action.payload);
    })
    .addCase(postCommentAction.pending, (state) => {
      state.sendingCommentStatus = RequestStatus.Pending;
    })
    .addCase(postCommentAction.fulfilled, (state) => {
      state.sendingCommentStatus = RequestStatus.Success;
    })
    .addCase(postCommentAction.rejected, (state) => {
      state.sendingCommentStatus = RequestStatus.Error;
    })
    .addCase(dropSendingStatus, (state) => {
      state.sendingCommentStatus = RequestStatus.Unsent;
    })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.nearOffers = [];
    })
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = CITIES.find((city) => city.name === action.payload) as City;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
