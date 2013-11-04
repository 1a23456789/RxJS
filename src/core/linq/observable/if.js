     /**
     *  Determines whether an observable collection contains values. There is an alias for this method called 'ifThen' for browsers <IE9
     *  
     * @example
     *  1 - res = Rx.Observable.if(condition, obs1);
     *  2 - res = Rx.Observable.if(condition, obs1, obs2);
     *  3 - res = Rx.Observable.if(condition, obs1, scheduler);
     * @param {Function} condition The condition which determines if the thenSource or elseSource will be run.
     * @param {Observable} thenSource The observable sequence that will be run if the condition function returns true.
     * @param {Observable} [elseSource] The observable sequence that will be run if the condition function returns false. If this is not provided, it defaults to Rx.Observabe.Empty with the specified scheduler.  
     * @returns {Observable} An observable sequence which is either the thenSource or elseSource.
     */
    Observable['if'] = Observable.ifThen = function (condition, thenSource, elseSourceOrScheduler) {
        return observableDefer(function () {
            elseSourceOrScheduler || (elseSourceOrScheduler = observableEmpty());
            if (elseSourceOrScheduler.now) {
                var scheduler = elseSourceOrScheduler;
                elseSourceOrScheduler = observableEmpty(scheduler);
            }
            return condition() ? thenSource : elseSourceOrScheduler;
        });
    };