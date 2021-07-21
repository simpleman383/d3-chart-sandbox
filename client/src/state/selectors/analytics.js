import crossfilter from "crossfilter2"
import { createSelector } from "reselect";
import { Filter } from "state/types/analytics";

const getLawsuits = state => state.analytics.data || [];
const getLawsuitFilter = state => state.analytics.filter;


export const lawsuitHistogramDataSelector = createSelector(
  [ getLawsuits, getLawsuitFilter ],
  (lawsuitItems, filter) => {
    const lawsuits = crossfilter(lawsuitItems);

    if (filter === null) {
      const lawsuitsByType = lawsuits.dimension(item => item.type);
      const typeGroups = lawsuitsByType.group().top(Infinity);
      return typeGroups;
    }
    else {
      const { type: filterType, value } = filter;

      switch (filterType) {
        case Filter.ByLawsuitType: {
          const lawsuitsByType = lawsuits.dimension(item => item.type);
          const filteredLawsuits = lawsuitsByType.filterExact(value).top(Infinity); 
          lawsuitsByType.dispose();

          return crossfilter(filteredLawsuits)
            .dimension(t => t.type)
            .group()
            .top(Infinity);
        }
        case Filter.ByCompany: {
          const lawsuitsBySourceTarget = lawsuits.dimension(item => [ item.source, item.target ], true);
          const filteredLawsuitsBySourceTarget = lawsuitsBySourceTarget.filter(value).top(Infinity);
          lawsuitsBySourceTarget.dispose();

          return crossfilter(filteredLawsuitsBySourceTarget)
            .dimension(t => t.type)
            .group()
            .top(Infinity);
        }
        default:
          return [];
      }
    }
  }
);



export const lawsuitNetworkChartDataSelector = createSelector(
  [ getLawsuits, getLawsuitFilter ],
  (lawsuitItems, filter) => {
    const lawsuits = crossfilter(lawsuitItems);

    if (filter === null) {
      const lawsuitsBySourceTarget = lawsuits.dimension(item => [ item.source, item.target ], true);
      const nodeGroups = lawsuitsBySourceTarget.group().top(Infinity);
      lawsuitsBySourceTarget.dispose();

      const lawsuitsByType = lawsuits.dimension(item => item.type);
      const typeGroups = lawsuitsByType.group().top(Infinity);
      lawsuitsByType.dispose();

      const nodes = nodeGroups.map(group => ({ id: group.key }));
      const types = typeGroups.map(group => group.key);
      const links = lawsuits.all();

      return { nodes, links, types };
    }
    else {
      const { type: filterType, value } = filter;

      switch(filterType) {
        case Filter.ByCompany: {
          const lawsuitsBySourceTarget = lawsuits.dimension(item => [ item.source, item.target ], true);
          const lawsuitsFilteredLinks = lawsuitsBySourceTarget.filter(value).top(Infinity);
          lawsuitsBySourceTarget.dispose();

          const nodeGroups = crossfilter(lawsuitsFilteredLinks)
            .dimension(item => [ item.source, item.target ], true)
            .group()
            .top(Infinity);

          const lawsuitsFiltered = crossfilter(lawsuitsFilteredLinks);
          const lawsuitsFilteredByType = lawsuitsFiltered.dimension(function(d) { return d.type; });
          const typeGroups = lawsuitsFilteredByType.group().top(Infinity);
          lawsuitsFilteredByType.dispose();

          const nodes = nodeGroups.map(group => ({ id: group.key }));
          const types = typeGroups.map(group => group.key);
          const links = lawsuitsFiltered.all();

          return { nodes, links, types };
        }
        case Filter.ByLawsuitType: {
          const lawsuitsByType = lawsuits.dimension(function(d) { return d.type; });
          const lawsuitsFilteredLinks = lawsuitsByType.filterExact(value).top(Infinity);
          lawsuitsByType.dispose();

          const lawsuitsFiltered = crossfilter(lawsuitsFilteredLinks);
          const lawsuitsFilteredBySourceTarget = lawsuitsFiltered.dimension(item => [ item.source, item.target ], true);
          const nodeGroups = lawsuitsFilteredBySourceTarget.group().top(Infinity);
          lawsuitsFilteredBySourceTarget.dispose();

          const nodes = nodeGroups.map(group => ({ id: group.key }));
          const links = lawsuitsFiltered.all();
          const types = [ value ];

          return { nodes, links, types };
        }
        default: {
          return { nodes: [], links: [], types: [] };
        }
      }
 
    }
  }
);