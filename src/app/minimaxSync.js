class TimeoutError extends Error {
  constructor (message) {
    super(message)
    this.name = 'TimeoutError'
    this.message = 'Timeout reached'
  }
}

// Parameters
// ----------
// state : State
//     An instance of the State class representing the current state

// depth : Number
//     Depth is an integer representing the maximum number of plies to
//     search in the state tree before aborting

// maximizingPlayer : Boolean
//     Flag indicating whether the current search depth corresponds to a
//     maximizing layer (true) or a minimizing layer (false)

// Returns
// -------
// score: float
//     The score for the current search branch

// move: Move
//     The best move for the current branch; context.NO_LEGAL_MOVES for no legal moves
export default function minimaxSync (context, state, depth, maximizingPlayer = true) {
  if (context.timeLeft() < context.TIMER_THRESHOLD) {
    throw new TimeoutError()
  }

  let bestScore = maximizingPlayer ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
  let bestMove = context.NO_LEGAL_MOVES

  if (terminalTest(state, depth)) {
    return heuristicValue(context, state, depth, maximizingPlayer, context.scoreFn)
  }

  const _actions = actions(state)

  for (let i = 0; i < _actions.length; i++) {
    const action = _actions[i]
    const nextState = result(state, action)
    const { nextBestScore } = minimaxSync(nextState, depth - 1, !maximizingPlayer)
    const isNewMaximizingBestScore = maximizingPlayer && nextBestScore > bestScore
    const isNewMinimizingBestScore = !maximizingPlayer && nextBestScore < bestScore
    if (isNewMaximizingBestScore || isNewMinimizingBestScore) {
      bestScore = nextBestScore
      bestMove = action
    }
  }

  return { bestScore, bestMove }
}

function actions (state) {
  return state.getLegalMoves(state.getActivePlayer())
}

function terminalTest (state, depth) {
  return depth === 0 || actions(state).length === 0
}

function result (state, action) {
  return state.forecastMove(action)
}

function heuristicValue (context, state, depth, maximizingPlayer, scoreFn) {
  const bestScore = maximizingPlayer ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
  const bestMove = context.NO_LEGAL_MOVES

  if (actions(state).length === 0) {
    return { bestScore, bestMove }
  } else if (depth === 0) {
    if (maximizingPlayer) {
      return { bestScore: scoreFn(state, state.getActivePlayer()), bestMove }
    } else {
      return { bestScore: scoreFn(state, state.getInActivePlayer()), bestMove }
    }
  } else {
    throw new Error('heuristicValue undefined')
  }
}
