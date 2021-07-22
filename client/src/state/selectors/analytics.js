import crossfilter from "crossfilter2"
import { createSelector } from "reselect";
import { Filter } from "state/types/analytics";

const getLawsuits = state => state.analytics.data || [];
const getLawsuitFilters = state => state.analytics.filters || [];


const getLawsuitsCrossfilter = createSelector(
  [ getLawsuits ],
  (lawsuitItems) => crossfilter(lawsuitItems)
);

const getLawsuitsTypeReadingIndex = createSelector(
  [ getLawsuitsCrossfilter ],
  (lawsuitCrossfilter) => lawsuitCrossfilter.dimension(item => item.type)
);

const getLawsuitsTypeFilteringIndex = createSelector(
  [ getLawsuitsCrossfilter ],
  (lawsuitCrossfilter) => lawsuitCrossfilter.dimension(item => item.type)
);

const getLawsuitsSideReadingIndex = createSelector(
  [ getLawsuitsCrossfilter ],
  (lawsuitCrossfilter) => lawsuitCrossfilter.dimension(item => [ item.source, item.target ], true)
);

const getLawsuitsSideFilteringIndex = createSelector(
  [ getLawsuitsCrossfilter ],
  (lawsuitCrossfilter) => lawsuitCrossfilter.dimension(item => [ item.source, item.target ], true)
);


const applyFiltersSelector = createSelector(
  [ getLawsuitsSideFilteringIndex, getLawsuitsTypeFilteringIndex, getLawsuitFilters, getLawsuitsTypeReadingIndex ],
  (lawsuitsSidesIndex, lawsuitsTypeIndex, filters, typeIdx) => {
    const appliedFilterTypes = filters.map(filter => filter.type);

    for(const filterType of Object.values(Filter)) {
      if (!appliedFilterTypes.includes(filterType)) {
        switch (filterType) {
          case Filter.ByLawsuitType:
            lawsuitsTypeIndex.filterAll();
            break;
          case Filter.ByCompany:
            lawsuitsSidesIndex.filterAll();
            break;
          default:
            break;
        }
      }
    }
    
    for(const filter of filters) {
      switch (filter.type) {
        case Filter.ByLawsuitType:
          lawsuitsTypeIndex.filterExact(filter.value);
          break;
        case Filter.ByCompany:
          lawsuitsSidesIndex.filter(filter.value);
          break;
        default:
          break;
      }
    }

    return {};
  }
);


export const lawsuitHistogramDataSelector = createSelector(
  [ getLawsuitsTypeReadingIndex, applyFiltersSelector ],
  (lawsuitsTypeReadingIndex, _) => {
    return lawsuitsTypeReadingIndex.group().top(Infinity).filter(item => item.value > 0);
  }
);


export const lawsuitNetworkChartDataSelector = createSelector(
  [ getLawsuitsSideReadingIndex, getLawsuitsTypeReadingIndex, applyFiltersSelector ],
  (lawsuitsSideReadingIndex, lawsuitsTypeReadingIndex, _) => {

    return {
      nodes: lawsuitsSideReadingIndex.group().top(Infinity).filter(item => item.value > 0).map(group => ({ id: group.key })),
      links: lawsuitsSideReadingIndex.top(Infinity),
      types: lawsuitsTypeReadingIndex.group().top(Infinity).filter(item => item.value > 0).map(group => group.key)
    };
  }
);