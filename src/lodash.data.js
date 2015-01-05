;(function(){

  /**
   * Check if a value is undefined or null.
   * @param  {[Object]} x value to check.
   * @return {[Boolean]} Returns if x is undefined or null
   * otherwise returns true.
   */
  _.truthy = function(x){
      return x != null;
  };

  /**
   * Given a collection of objects, it returns consolidate
   * report by a specific key. Something like group by in SQL.
   * @param  {[Array]}    coll collection to proccess
   * @param  {[String]}   key to group by
   * @return {[Array]}    A consolidated version grouped by key.
   */
  _.reportBy = function(coll, key){
    return _.map(_.groupBy(coll, key), function(records) {
      return _.reduce(records, function(acum, record){
        return _.sumFields(acum, record);
      }, {});
    });
  };

  /**
   * Given an object, it picks all the keys present in the mappings
   * parameter an renames accordingly their values.
   *
   * @param  {[Object]} obj       Object from we want to get the keys.
   *
   * @param  {[Object]} mappings  Key-value object. Each key in this object
   * represent the original key name. On the other hand, each value represent
   * the new name.
   *
   * @param  {[Function]} getter  Getter function to retrive a value from obj
   * param.
   *
   * @return {[Object]}           New brand object with the picked keys.
   */
  _.pickAs = function(obj, mappings, getter){
    var result = {}, destKey, key;
    var keys = _.keys(mappings);

    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      destKey = (key in mappings)? mappings[key] : key;
      result[destKey] = (getter)? getter(obj, key) : obj[key];
    }
    return result;
  };

  /**
   * Given a collection of object, it tranforms each object using the mappings
   * param. This method it's similar to pickAs but for a collection instead an
   * object.
   * @param  {[Array]} coll     Collection to transform
   * @param  {[Object]} mappings Key-value object. Each key in this object
   * represent the original key name. On the other hand, each value represent
   * the new name.
   * @param  {[Function]} Getter function to retrive a value from obj
   * param.
   * @return {[type]}          Returns a transformed collection.
   */

  _.mapAndTransform = function(coll, mappings, getter){
    return _.map(coll, function(obj){
      return _.pickAs(obj, mappings, getter);
    });
  };

  /**
   * Sum
   * @param  {[type]} acum [description]
   * @param  {[type]} obj  [description]
   * @return {[type]}      [description]
   */
  _.sumFields = function(acum, obj){
    for(field in obj){
      if(!_.has(acum, field)) {
        acum[field] = obj[field];
      } else if(_.isNumber(obj[field])){
        acum[field] += obj[field];
      }
    }
    return acum;
  };

  /**
   * [keyToIndex description]
   * @param  {[type]} coll  [description]
   * @param  {[type]} field [description]
   * @param  {[type]} start [description]
   * @return {[type]}       [description]
   */
  _.keyToIndex = function(coll, field, start){
    start = (!_.truthy(start)) ? start : 0;
    return _.map(coll, function(obj, count){
      obj[field] = count + start;
      return obj;
    });
  };

  /**
   * [deepMerge description]
   * @param  {[type]} obj1 [description]
   * @param  {[type]} obj2 [description]
   * @return {[type]}      [description]
   */
  _.deepMerge = function(obj1, obj2) {
    for (var p in obj2) {
      try {
        if (obj2[p].constructor == Object) {
          obj1[p] = merge(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch(e) {
        obj1[p] = obj2[p];
      }
    }
    return obj1;
  };

})();
