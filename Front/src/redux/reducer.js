import { SEARCH_NAME, DELETE_FAV, GET_ALL, ON_CLOSE, RESET_SEARCH, GET_FAVORITES, NEXT_PAGE, PREVIOUS_PAGE, FIRST_PAGE, FILTER_POKEMONS, SORT_POKEMONS, CREATE_POKEMON, POST_FAV} from './action-types';

const initialState = {
  myFavorites: [],
  allPokemons: [],
  searchedPokemons: [],
  displayedPokemons: [],
  filteredPokemons: [], 
  currentPage: 1,
  itemsPerPage: 12,
  filterType: 'All',
  filterOrigin: 'All',
  sortBy: 'alphabeticalAsc',
  pokemons : [],
};

const reducer = (state = initialState, action) => {
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  
  switch (action.type) {
    case SEARCH_NAME:
      return { ...state, searchedPokemons: action.payload };
      case POST_FAV:
        return{...state, myFavorites: action.payload };

    case DELETE_FAV:
      return { ...state, myFavorites: action.payload };

      case GET_ALL:
        const allPokemons = action.payload;
        const sortedPokemonsAlphabetically = sortPokemons(allPokemons, 'alphabeticalAsc');
        return {
          ...state,
          allPokemons: sortedPokemonsAlphabetically,
          displayedPokemons: sortedPokemonsAlphabetically.slice(0, state.itemsPerPage),
          filteredPokemons: sortedPokemonsAlphabetically,
        };

      case ON_CLOSE:
        const newArray = state.allPokemons.filter((pokemon) => {
          if (pokemon.fromDatabase) {
            return pokemon.name !== action.payload;
          } else {
            return pokemon.basicInfo.name !== action.payload;
          }
        });
      
        const newFilteredArray = state.filteredPokemons.filter((pokemon) => {
          if (pokemon.fromDatabase) {
            return pokemon.name !== action.payload;
          } else {
            return pokemon.basicInfo.name !== action.payload;
          }
        });
      
        return {
          ...state,
          allPokemons: newArray,
          filteredPokemons: newFilteredArray,
          displayedPokemons: newFilteredArray.slice(startIndex, endIndex),
        };

    case RESET_SEARCH:
      return { ...state, searchedPokemons: [], allPokemons: action.payload, displayedPokemons: action.payload.slice(0, state.itemsPerPage), filteredPokemons: action.payload };

    case GET_FAVORITES:
      return { ...state, myFavorites: action.payload };

    case NEXT_PAGE:
      const nextPage = state.currentPage + 1;
      if (nextPage > Math.ceil(state.filteredPokemons.length / state.itemsPerPage)) {
        return state; 
      }
      const startIndexNextPage = (nextPage - 1) * state.itemsPerPage;
      const endIndexNextPage = startIndexNextPage + state.itemsPerPage;
      return {
        ...state,
        currentPage: nextPage,
        displayedPokemons: state.filteredPokemons.slice(startIndexNextPage, endIndexNextPage),
      };

    case PREVIOUS_PAGE:
      if (state.currentPage > 1) {
        const previousPage = state.currentPage - 1;
        const startIndexPreviousPage = (previousPage - 1) * state.itemsPerPage;
        const endIndexPreviousPage = startIndexPreviousPage + state.itemsPerPage;
        return {
          ...state,
          currentPage: previousPage,
          displayedPokemons: state.filteredPokemons.slice(startIndexPreviousPage, endIndexPreviousPage),
        };
      }
      return state;

    case FIRST_PAGE:
      return {
        ...state,
        currentPage: 1,
        displayedPokemons: state.filteredPokemons.slice(0, state.itemsPerPage),
      };

    case FILTER_POKEMONS:
      const { filterType, filterOrigin } = action.payload;
      const filteredPokemons = state.allPokemons.filter((pokemon) => {
        const typeCondition = filterByType(pokemon, filterType);
        const originCondition = filterByOrigin(pokemon, filterOrigin);
        return typeCondition && originCondition;
      });
      const sortedPokemons = sortPokemons(filteredPokemons, state.sortBy);
      const displayedPokemonsAfterFilter = sortedPokemons.slice(startIndex, endIndex);
      return {
        ...state,
        filteredPokemons,
        displayedPokemons: displayedPokemonsAfterFilter,
        currentPage: 1,
        filterType,
        filterOrigin,
      };
      
      case SORT_POKEMONS:
        const { sortBy } = action.payload;
        const sortedPokemon = sortPokemons(state.filteredPokemons, sortBy);
        const displayedPokemonsAfterSort = sortedPokemon.slice(startIndex, endIndex);
        return {
          ...state,
          filteredPokemons: sortedPokemon,
          displayedPokemons: displayedPokemonsAfterSort,
          sortBy,
          currentPage: 1,
        };
        case CREATE_POKEMON:
          return {
            ...state,
            pokemons: [...state.pokemons, action.payload]
          };
          
          
          
          default:
            return state;
          }
        };
        
        
        
        
        
        const sortPokemons = (pokemons, sortBy) => {
          
          switch (sortBy) {
            case 'alphabeticalAsc':
              return [...pokemons].sort((a, b) => {
                const nameA = a.fromDatabase ? a.name : a.basicInfo.name;
                const nameB = b.fromDatabase ? b.name : b.basicInfo.name;
                return nameA.localeCompare(nameB);
              });
              
              case 'alphabeticalDesc':
                return [...pokemons].sort((a, b) => {
                  const nameA = a.fromDatabase ? a.name : a.basicInfo.name;
                  const nameB = b.fromDatabase ? b.name : b.basicInfo.name;
                  return nameB.localeCompare(nameA);
                });
                case 'attackAsc':
                  return [...pokemons].sort((a, b) => getAttackValue(a) - getAttackValue(b));
                  case 'attackDesc':
                    return [...pokemons].sort((a, b) => getAttackValue(b) - getAttackValue(a));
                  case "hpAsc":
                    return [...pokemons].sort((a, b) => getHpValue(a) - getHpValue(b));
                  case "hpDesc":
                    return [...pokemons].sort((a, b) => getHpValue(b) - getHpValue(a));
                  case "defenseAsc":
                      return [...pokemons].sort((a, b) => getDefenseValue(a) - getDefenseValue(b));
                   case "defenseDesc":
                    return [...pokemons].sort((a, b) => getDefenseValue(b) - getDefenseValue(a));
                  case "speedAsc":
                    return [...pokemons].sort((a, b) => getSpeedValue(a) - getSpeedValue(b));
                  case "speedDesc":
                     return [...pokemons].sort((a, b) => getSpeedValue(b) - getSpeedValue(a));
                  case "weightAsc":
                     return [...pokemons].sort((a, b) => getWeightValue(a) - getWeightValue(b));
                  case "weightDesc":
                    return [...pokemons].sort((a, b) => getWeightValue(b) - getWeightValue(a));
                    case "heightAsc":
                      return [...pokemons].sort((a, b) => getHeightValue(a) - getHeightValue(b));
                   case "heightDesc":
                     return [...pokemons].sort((a, b) => getHeightValue(b) - getHeightValue(a));
                    
                    default:
                      return [...pokemons];
                    }
                  };
                  const filterByOrigin = (pokemon, origin) => {
                    switch (origin) {
                      case 'All':
                        return true;
                        case 'Api':
                          return !pokemon.fromDatabase;
                          case 'Database':
                            return pokemon.fromDatabase;
                            default:
                              return false;
                            }
                          };
                          const filterByType = (pokemon, type) => {
                            switch (type) {
                              case 'All':
                                return true;
                              default:
                                const basicInfoType = pokemon.basicInfo?.type || [];
                                const customType = pokemon.type || [];
                                return basicInfoType.includes(type) || customType.includes(type);
                            }
                          };
                          
                          const getAttackValue = (pokemon) => {
                            
                            if (pokemon.fromDatabase) {
                              return pokemon.attack; 
                            }
                            
                            
                            const attackStat = pokemon.stats && pokemon.stats.find((stat) => stat.name === 'attack');
                            return attackStat ? attackStat.value : 0;

                            
                          };

                          const getHpValue = (pokemon) => {
                            if (pokemon.fromDatabase) {
                              return pokemon.hp; 
                            }
                          
                            const hpStat = pokemon.stats && pokemon.stats.find((stat) => stat.name === 'hp');
                            return hpStat ? hpStat.value : 0;
                          };

                          const getDefenseValue = (pokemon) => {
                            if (pokemon.fromDatabase) {
                              return pokemon.defense; 
                            }
                          
                            const defenseStat = pokemon.stats && pokemon.stats.find((stat) => stat.name === 'defense');
                            return defenseStat ? defenseStat.value : 0;
                          };

                          const getSpeedValue = (pokemon) => {
                            if (pokemon.fromDatabase) {
                              return pokemon.speed; 
                            }
                          
                            const speedStat = pokemon.stats && pokemon.stats.find((stat) => stat.name === 'speed');
                            return speedStat ? speedStat.value : 0;
                          };

                          const getWeightValue = (pokemon) => {
                            if (pokemon.fromDatabase) {
                              return pokemon.weight; 
                            }
                          
                            const weightStat = pokemon.basicInfo && pokemon.basicInfo.weight;
                            return weightStat !== undefined ? weightStat : 0;
                          };

                          const getHeightValue = (pokemon) => {
                            if (pokemon.fromDatabase) {
                              return pokemon.height; 
                            }
                          
                            const heightStat = pokemon.basicInfo && pokemon.basicInfo.height;
                            return heightStat !== undefined ? heightStat : 0;
                          };
                          
                          export default reducer;
                          
                          