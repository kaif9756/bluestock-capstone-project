const prisma = require('../prismaClient');
exports.syncDailyScore  = async (req, res) => {
    try {
        const { userId, guestId, date, score, completionTime } = req.body;
        if (!userId && !guestId) {
            return res.status(400).json({ error: "User or Guest ID required" });
        }
        const today = new Date().toISOString().split("T")[0];
        if (date > today) {
            return res.status(400).json({ error: "Future date not allowed" });
        }
        if (date > today) {
            return res.status(400).json({ error: "Future date not allowed" });
        }

        if (score < 0 || score > 1000) {
            return res.status(400).json({
                error: "Invalid score range"
            });
        }
        if (completionTime < 5 || completionTime > 3600) {
            return res.status(400).json({
                error: "Unrealistic completion time"
            });
        }

        const result = await prisma.dailyScore.upsert({
            where: userId
                ? { userId_date: { userId, date } }
                : { guestId_date: { guestId, date } },
            update: {
                score,
                completionTime
            },
            create: {
                userId,
                guestId,
                date,
                score,
                completionTime
            }

        });
        res.json({
            success: true,
            data: result
        });
      
        }catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Server error"
            });
        }
 };
 exports.getLeaderboard = async (req, res) => {
  try {

    const leaderboard = await prisma.dailyScore.findMany({

      orderBy: {
        score: "desc"
      },

      take: 10,

      select: {
        userId: true,
        score: true
      }

    });

    res.json(leaderboard);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Server error"
    });

  }
};
